# Feature Ideas

## Privacy Inboxes

FC had a class member have hurt feelings that details of a miscarriage was shared. Feelings of busted trust are too hard to re-build in a Sunday School setting. Therefore

### Idea - have mupltiple inboxes

Again - always use in the BCC line

- `Default` = `becca@beccamail.org`
  - can be configured
  - default = sensitive
- `Everything` = `eva@beccamail.org`
  - always copy/pastes the whole email into the note
  - includes alias of "addtochurchDB"
- `Sensitive` = `sarah@beccamail.org`
  - always updates that you contacted the person
  - never includes anything from the message
  - also has an alias of 'sensitive'
- `Announcement` = `anna@beccamail.org`
  - let the class ledaership know that something noteworthy happend

## Settings Over Email (SOE)

I want to be able to forget my Becca credentials.

I would like to do most things with Becca over email. Can I change my settings, etc over email?

Maybe I could email: to:becca@ subj: HELP
Becca replies with:

    Subj:`Re: Help`
    Body: Here is what I can do over email:
       * Link for Option 1 (this is a mailto link starting a new request)
       * Link for Option 2 (this is a mailto link starting a new request)
       etc.

## Reciever Preferences

Say Bob Hamendez never wants me to text him again, because of his plan, because whatever.
Can he opt out?
Can he flag his preference in anyway?
Can he say he'd rather get an email?
Can he change his mind over time?
Can he manage those changes?
Can that preference be applied for everyone contacting him using Becca?

### Message First Workflow

Usually you pick the people first - then write message.
Users will use a people first workflow for outreach messaging.

### Member/User Timeline

- Show the activity log of each member
- could use the spectre timeline
- with "load more" for older logs

## Map View

## My Previous Activity

## Date of Last Activity

## Role Based Views (Home/Summary View)

### Small Group View

1. Look for Class Members who have not seen any love recently
1. See my recent activity

### Director View

1. Look for Small Group Leaders who have not made many contributions
1. Look for Class Members who have not seen any love recently

### Teacher View

1. Look for Class Members who have not seen any love recently

## Menber Profiles

For inspiration see

- [@spectre/components/panels](https://picturepan2.github.io/spectre/components/panels.html)
- [@spectre/experimentals/timelines](https://picturepan2.github.io/spectre/experimentals/timelines.html)

1. It would be nice if the timeline allowed for collapsable months!
1. What governs the data entry for the timeline?
1. What prevents it from being too sparse or overgrown?

## Table Column Config

Using a drop down menu, users can chose the columns they want from the data

### Data Avaiable
  Member
    .name
    .picture
    .dob
    .age
    .status
    .phone
    .email
    .address
    .zip5
    .addressMap
    ._postEmail
    ._postVoiceCall
    ._postTextmessage
    ._mostRecentNote
    ._daysSincemostRecentNote
    ._notesPostedWith14days
    ._lastAttended
    ._daySinceLastAttended
    ._tenureInTheClass (today-first_attended)
    ._numberOfKids
    ._oldestKid
    ._yonngestKid
    .notes[]
      Note
        .Date
        .Source
        .Note
        .By
    .family[]
      Member
        .picture
        .name
        .age