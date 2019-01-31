# BECCA

## ?Why

I largely use some church software on my phone -  because, you know, its 2018, and I will wait no longer for them to get with the times. My main wish is that the chruch software would deprecate my usability wrapper by having digital systems that go and sin no more. If you are reading this and happen to make church software, for the love of everythng good - please read the use cases below.

## Wait, But Who is Becca?? 

Becca is named after an easy way to remember that you can BCC her on regular ol' emails. If you have introduced your self to her before, then she will relentlessly copy/paste your messages as comments into some church system.

## Use Cases

1. Everything has to be done from your phone (non-negotiable)(re-prioritize your list)(anything that does not have this as #1 is wrong)
1. UI Bulk Comment
    1. Human multi-selects users on Becca, and then sends them all the exact same message.
1. Auto Tags Conversation Started.
    1. Start a Text, Email, or Call and Becca will not that you started a conversation with that person.

## Architecture

`Human types on a Browser Probably on a Phone --> Becca ---> ChurchDB`

1. When a user `registers` with Becca, she associates an owned email address with an ChurchDB user (Since ChurchDB wont tell us the email)
1. During `Registration`, Becca pre-loads the users class information - and caches it for 24 hrs.
1. Once user verifies the email ownership, they can complete login to the system
1. User can login to the site - and
    1. Send an email : `uses regular email program & prepopulate BCC:Becca`
    1. Send a text : Becca will note `Leader sent "Jane Doe" a text on: {todaysDate}`
    1. Make a call : Becca will note `Leader sent "Jane Doe" a text on: {todaysDate}`
1. The user can also email Becca (typically in the BCC line)
    1. Email your class mates, & add Becca to the BCC line, Becca will copy/paste the first 2k letters of your email as a note to each of the users you have sent the email to (To line or CC line)
    1. Ask Becca: "Body: What can you do?"
        1. `Tag the Comments in ChurchDB` for the emails you are alrady sending
        1. `Show you a report` of the number of people you reached out to
            1. Email Sent - in the last N days
            1. SMS Sent - in the last N days
            1. Phone Calls - in the last N days
            1. Change over Last Period
            1. Class Size trend overlay with touch counts
        1. `Make an email group` I can not send emails (yet) on your behalf for technical reason - but I can make groups for you to copy paste:
            1. `Make an Email Group` - Outreach("MissedYouReport")
    1. MakEmail a group of users on Becca.
        1. My Groups("myNamedGroup")
        1. Outreach("missed last two weeks")

Put the FrontEnd Out there via AWS Amplify ???

### GOAL(S)

1. Mobile Offline First
1. Keep the UI very snappy

#### Implementation Questions:

1. What if the `ChurchDB messages` were kept local 
    1. and persisted via a `local storage effect`
    1. or maybe there was a `servicve worker` processing messages too into the
1. What if there was a view of the `remaining sync items`? inside settings or something else with a `sync now` button
1. Maybe there would be a subscription timer for flushing the cache.
1. "local storage" could be `indexDB`, or `local cache` or whatever...
1. The `FlushCacheEffect` might just send as many 

- Using:
  - [ ] Hosting (S3 + CDN)
  - [ ] Storage (S3)
  - [ ] Analytics (Event Stream)
  - [ ] AppSync (GraphQL)
  - [ ] Interactions? (for Email)

- Add SES Intergration
  - Hook Up Lambda Functions to handle incoming emails
  - Hook Up Lambda Functions to process outgoing emails

### Users

1. Store as an encrypted string
1. or is plaintext unavoidable
    1. relogin strategy: unless they login every time - and we are just a pass through.

Put this in S3:

UI could note the age of cache and request refresh on the data?
`s3://:bucket/:path/users/:{md5(email, "application string")}.json`

TTLdSessionToken:
`s3://:bucket/:path/sessionTokens/:{md5(email, "application string")}.json`

FailedCredentials:
`s3://:bucket/:path/failedCredentials/:{md5(email, "application string")}.json`

```js
Users{
    email: "___", //PK unique constraint
    verify: {
        token:"RANDOM DIGITS",
        tokenCreateDate: new Date()
        isVerified: bool,
    },
    password:{
        factor: 14,
        ChurchDBPasswordEncrypted: bcrypt.unlock("___", key(username, salt, 'some fixed app string'))
    }
    multiClassData:{
        cacheCreateDate: new Date(), // application can decide if its worth updating
        multiClassRoster: {... from API}
    }
}
```

## API Gateway

```swagger

POST /register.json
    in: JSON(user + password)
    out:
        response: JSON (userToken, TTLdSessionToken + metaData)
        setCookie: emailToken TTLdSessionToken
    sideEffects:
        1. Creates user Data
        2. Fetches fresh cache
        3. Cache failed attempts to not beat up ChurchDB (24h)

GET  / && /myClasses.json
    200:
        in:
            cookie: {userToken sessionToken}
            queryParam {userToken, sessionToken}
        out: JSON MultiClassData
        sideEffects:
            1. Runs a Browser Task Against ChurchDB
    400:
        JSON:(ErrorID, errorMsg)

```
