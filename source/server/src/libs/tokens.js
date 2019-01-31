const util = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const md5 = require('md5');
const ms = require('ms')
const puppeteer = require('puppeteer');

const jwtverify = util.promisify(jwt.verify);
const jwtsign = util.promisify(jwt.sign);

const SEMI_SECRET = Buffer.from(md5("this is my application password that is processed by md5 anyway... + 2018"));
const iv = Buffer.from(md5('b7a78ab1-a8c3-4134-9149-dc5764a7fcb0').slice(0,16));

const isValidUser = async ({user, password}) => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.setViewport({width:1400, height:900});
    await page.goto(`${process.env.ChurchDB_URL}/Default.aspx?page=3410`, {waitUntil: "networkidle0"})
    
    await page.type('#ctl04_ctl01_txtLoginId', user);
    await page.type('#ctl04_ctl01_txtPassword', password);
    await Promise.all([
        page.waitForNavigation(),
        page.click("#ctl04_ctl01_btnSignin")
    ]).catch(err=>console.error(err));
    
    // detect success via page redirect
    if( page.url() !== `${process.env.ChurchDB_URL}/`){
        // not authorized;
        return false;
    }
    else{
        return true;
    }
}

exports.normalizeCredentials = (req, res, next)=>{
    const protoPrefix = req.secure ? "http://" : "http://";
    const _startLink = protoPrefix + req.headers.host + "/v1";

    req._user, req._password = null;

    // Cookies >> PostBody >> QueryString

    if(req.cookies && req.cookies.user){
        req._user = req.cookies.user;
    } else if(!req._user && req.body && req.body.user){
        req._user = req.body.user;
    } else if(!req._user && req.query && req.query.user ){
        req._user = req.query.user;
    }

    if(req.cookies && req.cookies.password){
        req._password = req.cookies.password;
    } else if(!req._password  && req.body && req.body.password) {
        req._password = req.body.password;
    } else if(!req._password && req.query && req.query.password){
        req._password = req.query.password;
    }  

    // console.log({_user: req._user, _pass: req._password})
    if(!req._user && !req._password && !req.cookies.sessionToken){
        return res.status(404).json({error: "Provide a valid `email` and `password` see `/v1` for documumentation links",
        _link: _startLink})                 
        }
    
    next()
}

exports.credentialsAvailable = (req, res, next)=>{
    if (!req._user && !req._password ){
        res.status(404).send('Provide an `user` and `password` in the query string or cookies');
    }
}

exports.normalize = (req, _, next)=>{
    req._tokens = {session: null};
    
    if(req.query && req.query.sessionToken){
        req._tokens.session = req.query.sessionToken;
    }
    if(!req._tokens.session && req.cookies && req.cookies.sessionToken ){
        req._tokens.session = req.cookies.sessionToken;
    }
    next()
}

exports.validate = async (req, res, next)=>{
    
    const protoPrefix = req.secure ? "http://" : "http://";
    const _startLink = protoPrefix + req.headers.host + "/v1";
    
    // normalized location present?
    let sessionToken = null;
    const decipher = crypto.createDecipheriv('aes-256-cbc', SEMI_SECRET, iv);

    if(!req._tokens.session){
        return res.status(404).json({error: 'Provide a `sessionToken`! If you do not have one get one at /v1/tokens.json',
                                        _link:{
                                            '/v1': _startLink,
                                            '/v1/tokens.json': _startLink + '/tokens.json'
                                        }
                                    });
    }
    // both present and properly signed/encrypted
    else{
        sessionToken = await jwtverify(req._tokens.session, SEMI_SECRET)
            .catch(er=>{
                return res.status(412).send({error:'Provide a valid `sessionToken` - perhaps its expired - or bene altered from its original issuance',
                                             _link:{
                                                '/v1': _startLink,
                                                '/v1/tokens.json': _startLink + '/tokens.json'
                                            }
                                        })
            })
        if(sessionToken){
            let _password = decipher.update(sessionToken.password, 'hex', 'utf8')
            _password += decipher.final('utf8');

            req._password = _password;
            req._userToken = sessionToken.userToken;
            req._user = sessionToken.user;

        } else {
            return res.status(404).send({error:'Provide a valid `sessionToken`',
                                        _link:{
                                            '/v1': _startLink,
                                            '/v1/tokens.json': _startLink + '/tokens.json'
                                        }
                                    });
        }
    }
    next()
};

exports.get = async (req, res)=>{
    const protoPrefix = req.secure ? "http://" : "http://";
    const _startLink = protoPrefix + req.headers.host + "/v1";
    
    let expiry = '2d'
    const cipher = crypto.createCipheriv('aes-256-cbc', SEMI_SECRET, iv);

    if(req._tokens.session){
        sessionToken = await jwtverify(req._tokens.session, SEMI_SECRET)
        .catch(er=>{
            return res.status(412).send({error:'Provide a valid `sessionToken` - perhaps its expired - or bene altered from its original issuance'})
        })
        let { passwordENC_TYPE, password, expiresIn, userToken, ...partialSessionToken} = sessionToken
        
        // update the cookie
        var newSessionToken = await jwtsign({ 
                                        user: sessionToken.user, 
                                        passwordENC_TYPE: sessionToken.passwordENC_TYPE,
                                        password: sessionToken.password,
                                        userToken: sessionToken.userToken,
                                        expiresIn: sessionToken.expiresIn},
                                        SEMI_SECRET, { expiresIn: expiry})
                                        .catch(er=>console.error(er));
        res.cookie('sessionToken', newSessionToken,  { secure: false, httpOnly: false, expires: new Date(Date.now() + ms(expiry)) });
        // remove any sensitive data
        res.clearCookie("user", { path: '/' });
        res.clearCookie("password", { path: '/' });
        return res.json({
                            sessionToken: req._tokens.session, 
                            _tokenData: partialSessionToken,
                            _links:{
                                "@up" : _startLink,
                                "@self": _startLink + '/tokens.json',
                                "/classMembers.json" : _startLink + "/classMembers.json"
                            }
                        })
    }
    else {
        let p = await isValidUser({user: req._user, password: req._password}).catch(er=>console.error(er));
        if(p){
            let encPassword = cipher.update(req._password, 'utf8', 'hex');
                encPassword += cipher.final('hex'); 
            let userToken = md5(req._user + SEMI_SECRET);
            var sessionToken = await jwtsign({ user: req._user, 
                                           passwordENC_TYPE: "aes-256-cbc",
                                           password: encPassword,
                                           userToken,
                                           expiresIn: expiry},
                                             SEMI_SECRET, { expiresIn: expiry})
                           .catch(er=>console.error(er));

            res.set('Cache-Control', `'public, max-age=${ms(expiry)/1000}'`);
            res.clearCookie("user",{ path: '/' });
            res.clearCookie("password",{ path: '/' });
            res.cookie('sessionToken', sessionToken,  { secure: false, httpOnly: false, expires: new Date(Date.now() + ms(expiry)) });
            return res.json({ 
                                sessionToken,              
                                _tokenData: {
                                    user: req._user,
                                    expiresIn: expiry
                                },
                                _links:{
                                    "@up" : _startLink,
                                    "@self": _startLink + '/tokens.json',
                                    "/classMembers.json" : _startLink + "/classMembers.json"
                                }
                            })

        }
        else {
            return res.status(404).json({
                                error: "Provide a valid `email` and `password` see `/v1` for documumentation links",
                                _link: _startLink})
            
        }
    }
};