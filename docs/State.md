# State Modeling for Becca

Becca will have some application state on the client. The Application will manage the user state and

``` graphql
url/location: String
    myClasses > Outreach | Attendance | MyGroups | Birthdays | Anniversaries
accounts:{
    active:{
            _enabled: true,
            AcctName: LABEL,
            AreanaUser: String,
            AreanaPass: String
    },
    available:[
        {
            _enabled: true,
            AcctName: LABEL,
            AreanaUser: String,
            AreanaPass: String
        },
        {
            _enabled: true,
            AcctName: LABEL,
            AreanaUser: String,
            AreanaPass: String
        }
    ]
},
email: String,
AttendanceFilter: String,
myClasses: {Classes(id)[Contacts]}
myGroups: {Group(name)][Contacts]}
showBeccaReminders: false
EmailVerified: true
isMenuShown: false
```

## Pages

### Classes

Select a class to manage

### Outreach

Filter:
Multiselect:
    Contacts:
        EmailLink:
        TextLink:
        PhoneLink:

MutliSelect:
  people > Message > send from your phone
  <!-- @Future Idea : Message > people > send from your phone -->

### Groups

If you message the same people often, then set it up as a group.

### Birthdays

### Anniversarries

## Client URL Structure

+ `/` (no cookie) login screen
+ `/` (yay cookie) (classes list)
+ `/:classID/` Class Menu
+ `/:classID/outreach` Outreach list
  1. multi-select members
  1. compose message
  1. Set it up for sending from your phone
  1. Mode: `Eva` or `Sarah` (records the note in ChurchDB)
+ `/:classID/attendance` Take attendance
+ `/:classID/mygroups` Take attendance
+ `/:classID/birthdays` Take attendance
+ `/:classID/anniversaries` Take attendance