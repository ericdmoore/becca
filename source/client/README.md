# Becca

Becca exists because some systems that we are forced to use are rubbish. Unabashed rubbish. So since life is too short only swim upstream in a stream of garbage. Becca will do that for me.

Becca is an email bot - who will update these systems for me.

I do the real work of reaching out to people - and Becca does the grunt work of updating systems that I did my job. Doing my job, and then telling someone that I did my job is not my idea of efficient use of my time.

Becca solves some rubs that I have personally dealt with.

1. Auto Updating Systems when I email folks (Becca has BCC feature)
2. Batch Messaging Folks (Becca supports batch messages)
3. I have 10 minutes to spare, who should I reach out to - (Becca can sort members by their participation)

## Supported Personas

1. Class Leaders
   1. Class Director
   1. Class Teacher
1. Group Leaders
   1. Group Leader Spouse
1. Class Member
   1. Active
   1. Fringe
   1. Prospect

## User Stories

1. Quick Actions:
   1. ezMail: Opens email to < Person > & with Becca in the bcc line
      - could use a `becca++newThread:1234asdf@beccamail.org` address
      - could use the needed rule that `becca@beccamail.org` usually starts a new thread
   1. ezCall: Open Up phone app & reports that you made a call to < Person > at < Time >
   1. exText: Opens Messages to Person - but reports that you made a text to < Person > at < Time >
1. Public UI
   1. The Public Internet gets a limited Navigation Menu
   1. The Public Internet can attempt to login using their ChurchDB credentials.
   1. The Public Internet can read help message on 'regarding password changes'
1. Register (aka - first time login)
   1. I can save my credentials in the browser for next time.
   1. Greeting Welcome Message
   1. "Who Is" / "What is" Becca
   1. Confirm Email - [ it blocks the flow ? ]
      1. Message: To confirm:: Reply to Becca's Mail with a "HI" or what ever you like. Other Actions: (send again - change email)
   1. Skippable Tour
   1. Tour:
      1. Search For "Eric Moore"
      1. Update His Record
      1. Make a Template
      1. Send an Email Message
      1. Send a Text
1. For a logged-in users:
   1. Browse the class - and see "who needs some love"
      1. Act: Call
      2. Act: Text
      3. Act: Email
      4. Act: Note
   1. Browse my group looking for people "needing some love"
      1. Act: Call
   1. Browse a sorted list - still looking to love on people
   1. Select some folks from the table
      1. Chose `Make Notes` -OR- `Send Messages`
      1. compose the message OR import a template
      1. Make edits
      1. Save -OR- (Preview/Send/Schedule)
      1. Preview: Sends a mail preview to "myown" email
      1. Send the eMail/SMS
      1. Schedule the eMail
   1. Compose Messages as a template
      1. Incorporate `replacement words` `(
   1. Compose Personal Message?
   1. Batch Tag Message
        - Write Message, Multi-Select, Submit
        - Schedule Mail to go out
            - use the calender to schedule the mail
            - the calendar to see the upcoming schedule
            - the timeline to see if someone is getting "pelted"
        - But Really you do this
            1. Write the message,
            2. Pick your people once in SMS app (group chat)
            3. Go to the not mobile friendly ChurchDB
            4. Maybe Paste the message there - maybe re-type it out
            5. Hunt and peck the same people with out scan/seek/search
            6. Multi-select Your Group
            7. Submit
   1. Organize the Class List into My List
        1. Send an email to that list on my email
1. Mail Room (handler API)
    1. Read the FROM & To Lines
        - If the user is a registered Becca user, then process the email.
        - Processing: make a comment from the sender on to all of the people on the TO line

## Installation

git clone?

npm i

// npm i < the officialName of the pkg> -S | -D

## Usage

npm start

## Options

### CLI Opts

### Lib API

### Client Side DB

Do we really need this anymore? Using Hyperapp for state? State will already by an in-memory DB....

1. [http://lokijs.org](http://lokijs.org)
2. [http://taffydb.com/](http://taffydb.com/)
3. [https://github.com/hexojs/warehouse](https://github.com/hexojs/warehouse)
4. [https://github.com/louischatriot/nedb](https://github.com/louischatriot/nedb)
