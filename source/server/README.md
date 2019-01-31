# ChurchDB API (via Puppeteer)

1. Login `() => cookie?`
1. Logout `() => null/cookie removal?`
1. grabClasses `() => [{}]:ClassArr`

``` js
Class{
        name: "ClassName",
        meetingTime: "9:15"
        memberSize: 113,
        deptNo: 1,
        _link: "default.aspx?page=3480&pagetab=3481&group=1588"
    }
```

1. SyncClassMembers `() => [{}]:MemberArr`

``` js
Member{
    firstName: "", // #accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.row-fluid.clearfix > div.col-sm-9.xs-text-center > h1 > span.first-word --innerText
    lastName: "", // #accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.row-fluid.clearfix > div.col-sm-9.xs-text-center > h1 > span:nth-child(2) --innerText
    email: "", // #accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.demographics > span:nth-child(1) -- outerText
    Address:{
        full:"", // #accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.personcontact > ul > li > div > span --innerText
        street:"", // (parse full)
        state:"",
        city:"",
        zip:""
    }
    homePhone: "", // #accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.demographics > ul > li:nth-child(1) > span -- innerText
    cellPhone: "", // #accordion > div:nth-child(1) > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.demographics > ul > li:nth-child(2) > span -- innerText
    dateDOB:{ // #accordion > div > div > div > div:nth-child(1) > div.col-sm-9.col-md-10.xs-text-center > div.summary > div.col-sm-6.demographics > span:nth-child(1) --innerText
        iso:"",
        epoch:1234
    },
    _commentHandle: "#ASDasd234_ctl123_asdasd_ETC"
    commentLastDate: "?mm/dd/yyyy";
    commentShown: 5
    joinedDate: "?mm/dd/yyyy";
    dateFirstVisit:{
        iso:"",
        epoch:1234
    }
    _familyProfile:[
        {name:"",
         relTyle: 'spouse' //  souse | child
         age: 33,
         pic:`/CachedBlob.aspx?width=150&height=150&guid=${guid}`}
        {}
    ]
}

```

1. AddComment `("from","to","commentBody") => bool:success`
1. EmailTheGroup(email body, "groupName") `("from","groupName","emailBody") => bool:success`

With Registered Account
We store the user + bcrypt of ChurchDB Password

- if user login success, then we pester ChurchDB with passthrough of ChurchDB Login

May not need much of a backend storage...