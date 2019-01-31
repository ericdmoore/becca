const assert = require('assert');
const ms = require('ms')
const util = require('util');
const fs = require('fs');

const puppeteer = require('puppeteer');

// const mkdirp = util.promisify(require('mkdirp'));
// const md5 = require('md5');
// const { descrStats }  = require('./utils.js');

const { ClassesLeading }  = require('./classPage-comb.js');
const { membersForaClass, multiClassMembers }  = require('./memberPage-comb.js');

const fsp = {
            readFile: util.promisify(fs.readFile), 
            writeFile: util.promisify(fs.writeFile), 
            appendFile: util.promisify(fs.appendFile) 
        };
const BUCKET = 'becca.cache'

const beccaBucketCheck = async ({s3client})=>{
    let res = await s3client.listBuckets().promise().catch(er=>console.error(er))
    let checkpass = res.Buckets.filter(buc => buc.Name === BUCKET).length > 0
    assert(checkpass ,`This route requires a BUCKET: ${BUCKET}`)
    return checkpass;
}

const beccaKey = ({userToken})=> userToken + '.json'

const getMultiClassData = async ({user, password}) => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.setViewport({width:1400, height:900});
    await page.goto(`${process.env.ChurchDB_URL}/Default.aspx?page=3410&requestUrl=%2f`, {waitUntil: "networkidle0"})

    await page.type('#ctl04_ctl01_txtLoginId', user);
    await page.type('#ctl04_ctl01_txtPassword', password);
    
    await Promise.all([
        page.waitForNavigation(),
        page.click("#ctl04_ctl01_btnSignin")
    ]).catch(er=>console.error(er));
    
    let multiClassRoster = null

    if( page.url() !== `${process.env.ChurchDB_URL}/`){
        // you are not authorized;
        console.log('BAD LOG!',page.url());
        await page.screenshot({path: 'example.png'})
        await browser.close().catch(err=>console.error(err));
        throw new Error("You are not authorized");
    }else{
        // successful login!
        await page.goto(`${process.env.ChurchDB_URL}/Default.aspx?page=3479`).catch(er=>console.error(er));
        const panelContent = await page.$eval('#accordion',(elem)=>{
            return elem.outerHTML
        });

        let classData = ClassesLeading(panelContent)
        // let memberData = await membersForaClass(page, classData[1]._link)
        // // console.log({memberData});
        
        multiClassRoster = await multiClassMembers(page, classData)
                            .catch(err=>console.error(err));;
        // console.log(JSON.stringify(multiClassRoster,null,2))     
        
        // ageArr = memberData.map(member=>member.age).filter(x =>!isNaN(x));
        // descrStats(ageArr, 'Ages   :');
        await browser.close()
            .catch(er=>console.error(er));
    }
    // await page.screenshot({path: 'classesPage.png'})
    return multiClassRoster;
}
/**
 * @dependsOn: s3://becca.cache/:userToken .json
 */

exports.init = async ({s3client})=>{
    
    let expiry = "4h";
    const filedb_loc = __dirname + '/localdb/data.json';

    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
    
    if( await !beccaBucketCheck({s3client}).catch(er=>console.error(er)) ){
        throw new Error(`Missing Required Bucket: ${BUCKET}`)
    }

    const scrapeCacheRespond = async ({req, res, s3client, expiry})=>{
        // fetch and cache
        console.log(">>> cache miss");
        const data = await getMultiClassData ({user: req._user, password:req._password})
            .catch(err=>console.error(err));

        const ret = {data, 
            _cache: {
                iat: (new Date).getTime(),
                expires: (new Date).getTime() + ms('2d')
                }
            }
        await s3client.putObject({
                    Bucket:BUCKET, 
                    Key: beccaKey({userToken: req._userToken}),
                    Body: JSON.stringify(ret,null,2)
                    }).promise().catch(er=>console.log(er))
        res.set('Cache-Control', `'public, max-age=${ms(expiry)/1000}'`);
        return res.json(ret);
    }

    return async (req, res)=>{
        // console.log(`${req._userToken}`);
        
        let cacheFound = await s3client.getObject({
                                Bucket: BUCKET, 
                                Key: beccaKey({userToken: req._userToken})
                            }).promise().catch(er=>{
                                if(er.code === "NoSuchKey"){
                                    return false;
                                }
                                else console.error(er)
                            })
        if(cacheFound){
            // console.log(found)
            const ret = JSON.parse(cacheFound.Body.toString('utf8'));
            if('_cache' in ret
                && 'expires' in ret._cache
                && (new Date).getTime() <= ret._cache.expires ){
                    // console.log(">>> cache HIT");
                    res.set('Cache-Control', `'public, max-age=${ms(expiry)/1000}'`);
                    return res.json(ret);
            }
            else{
                return await scrapeCacheRespond({req, res, s3client}).catch(er=>console.error(er))
            }
        } else {
            return await scrapeCacheRespond({req, res, s3client}).catch(er=>console.error(er))
        }   
    }
}