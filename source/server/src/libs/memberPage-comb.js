const parse5 = require('parse5');
const jsdom = require("jsdom");
var flattenDeep = require('lodash/flattenDeep.js');
var flattenDepth = require('lodash/flattenDepth.js');

const { printNodes }  = require('./utils.js');

const calculateAge = (birthDate, otherDate=null)=> {
    birthDate = new Date(birthDate);
    otherDate = otherDate ? new Date(otherDate) : new Date();

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() 
        && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;
}

const membersForaClass = async (_page, _relClassLink)=>{
    await _page.goto(`${process.env.ChurchDB_URL}/${_relClassLink}&pagetab=3481`).catch(er=>console.error(er))
    // const eH = await _page.$('#accordion').catch(er=>console.error(er));
    const nodeListsFromPage = await Promise.all([
        /* firstNameArr */      _page.$$eval(`#accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.row-fluid.clearfix > div.col-sm-9.xs-text-center > h1 > span.first-word`,
                                    (nodes)=> nodes.map(n=>n.innerText)),
        /* lastNameArr */       _page.$$eval(`#accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.row-fluid.clearfix > div.col-sm-9.xs-text-center > h1 > span:nth-child(2)`,
                                    (nodes)=> nodes.map(n=>n.innerText)),
        /* emailArr */          _page.$$eval(`#accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.demographics > div`,
                                    (nodes)=> nodes.map(n=>n.textContent.replace('↵',' ').trim())),
        /* addressArr */        _page.$$eval(`div.address`,
                                    (nodes)=> nodes.map(n=>n.innerText.replace('↵',' ').replace('\n',' ').trim())),
        /* homePhoneArr */      _page.$$eval(`#accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.demographics > ul > li:nth-child(1) > span`,
                                    (nodes)=> nodes.map(n=>n.textContent ? n.textContent.replace('Home',' ').trim().replace(' ','') : null)),
        /* cellPhoneArr */      _page.$$eval(`#accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.demographics > ul > li:nth-child(2) > span`,
                                    (nodes)=> nodes.map(n=>n.textContent ? n.textContent.replace('Mobile',' ').trim().replace(' ','') : null)),
        /* dateDOBArr */        _page.$$eval(`#accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.demographics > span:nth-child(1)`,
                                    (nodes)=> nodes.map(n=>n.outerText)),
        /* AddCommentbtnIdArr*/ _page.$$eval(`div.table-responsive`,
                                    (nodes)=> nodes.map(n=> n.nextElementSibling.id)),
        /* JoinedDateArr  //     _page.$$eval(`#accordion > div:nth-child(2) > div > div > div:nth-child(3) > div > div > div > div.panel-body > div.kfs-person-details.col-sm-6 > div:nth-child(2) > span`),
                                        (nodes)=>nodes.map(n=>n.textContent) 
            not done - due to finding servere inconsistenncies in DOM structure

          @ToDo: Add Last Comment
          @ToDo: Add Last Attended
        */
    ]).catch(er=>console.error(er));
    
    [   firstNameArr,
        lastNameArr, 
        emailArr, 
        addressArr, 
        homePhoneArr, 
        cellPhoneArr, 
        dateDOBArr, 
        AddCommentbtnIdArr] = nodeListsFromPage;
    
    const memberArr = firstNameArr.map((firstName, i)=>{
        let plain_address = addressArr[i].replace('\n',' ');
        let addr_parts,zip, state, city, street = null

        if(plain_address && plain_address.includes(' ')){
            addr_parts = plain_address.split(' ');
            zip = addr_parts.splice(-1, 1)[0];
            state = addr_parts.splice(-1, 1)[0];
            city = addr_parts.splice(-1, 1)[0].replace(',','');
            street = addr_parts.join(' ');    
        }
    
        return {
            name:{
                full:   firstName +" "+ lastNameArr[i],
                first:  firstName,
                last:   lastNameArr[i],
            },
            email: emailArr[i],
            dob: dateDOBArr[i].split(" ")[0], // we kill off the (AGE) section b/c sometimes it is  missing
            age: calculateAge(dateDOBArr[i].split(" ")[0]),
            address: {
                plain: plain_address,
                street,
                city,
                state,
                zip
            },
            phone:{
                home: homePhoneArr[i],
                cell: cellPhoneArr[i],
            },
            _meta:{
                _addCommentButtonId: AddCommentbtnIdArr[i],
                _classUrl: _page.url()
            }   
        }
    })
    // console.log(JSON.stringify(memberArr, null, 2));
    
    return memberArr;
}

const multiClassMembers = async(_page, _classData)=>{
    return await 
    Promise.all( _classData.map( async (oneClass,i) => {
        return { _classMetaData: oneClass,
                    members : await membersForaClass(_page, oneClass._link)
            };
    })).catch(er=>console.error(er));;
}

module.exports = { membersForaClass, multiClassMembers }
