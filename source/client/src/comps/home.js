/**
 * Actions for dealing with authentication and user credentials
 * @author: Eric Moore <eric@beccamail.org>
 * @module comps/Home
 */

/**
 * Home Page Deals with
 * =========================
 *
 *  First Deals with My vs Public Home
 *
 *
 * 1. How am I doing?
 *    1. Barry Goal: 1 contact per week.
 *    1. Boot Risk: if you don't contact anyone for 180 days - you may lose your credentials and be asked to complete a training session
 *
 *
 * 1. How are my people doing?
 *    1. Days Since Contact
 *    1. Days Since Last Attendance
 *    1. Contacts in the last 28 days
 *    1. Praise notes?
 *
 *
 * 1. What do I need to do?
 *    1. Contact Members (Add Touches)
 *    1. Write message blasts
 *    1. Add A Note.
 *
 *
 * 1. Give Feedback on the prompts per person
 *    1. Thumbs up/down on "Maybe Send this _______ to _______"
 *
 *
 * 1. Are my Goals getting closer?
 *    1. Goal: % Group Attendance on some Sunday?
 *    1. Goal: Get _____ & ____ to show up
 *    1. Goal:
 *
 *
 * 1. How Am I doing compared to my peers?
 *    1. Cross Compare
 *
 *
 */

/**
  * Home Sections
  * ==================
  *
  * Suggestions:
  * - Contact this person:
  *
  * Goals: (`+/goals`)
  * - Contact my whole group 1 per week.
  * + I can add a handwritten goal for my self
  *   + optional: deadline
  *   + update progress:
  *
  * My Activity: (`+/activity`)
  * - my timeline
  *
  * My Group Activity: (`+/activity/groups/:id`)
  * - Graph of class attendance
  * - Graph of "my group" attedance
  *   + prompt: make my group
  * - List my group by most consistent
  * -
  *
  * Class Activity: (`+/activity/classes/:id`)
  * - list of annoucements from members
  * - scatter plot
  *
  *
  * Graphs:
  * - Total Class Attendance
  *     - Line Chart
  * - Scatter plot each point is a person, X=#notes just from me, Y=Attendance, dot size= notes from anyone, ea
  *     - https://eventbrite.github.io/britecharts/tutorial-scatter-plot.html
  * - Bullet Chart of touches `for my group`|`for the whole class` over last 28 days
  *    - https://eventbrite.github.io/britecharts/tutorial-bullet.html
  *    - target= People * 4 Weeks * 1 contact / week = 4P over 28 days
  *    - bad= 1.5P over 28 days
  *    - satisfactory = 2.5P over 28 days
  *    - good = 3P over 28 days
  *    - max = my max over the last 180 days
  *
  */

/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Link, Route, Switch, Redirect, location } from '@hyperapp/router' //eslint-disable-line
/* eslint-enable no-unused-vars */

import cc from 'classcat'
import { Bullet } from './BulletChart.js'
import { CalendarData } from '../utils/Calendar.helper.js'

const Goals = ({ match }) => () => {
  console.log(match)
  return (
    <div>
      <div class="my-2 tile">
        <div class="tile-icon">
          <figure class="avatar avatar-lg">
            <img src="//picturepan2.github.io/spectre/img/avatar-2.png" alt="Avatar"/>
          </figure>
        </div>
        <div class="tile-content">
          <p class="tile-title">The Avengers</p>
          <p class="tile-subtitle">Earth's Mightiest Heroes joined forces to take on
      threats that were too big for any one hero to tackle...</p>
          <div class="bar bar-sm">
            <div class="bar-item" role="progressbar" style="width:25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div class="tile-action">
          <button class="btn btn-primary" disabled >Update</button>
          <button class="btn" disabled>X</button>
        </div>
      </div>
      <div class=" my-2 tile">
        <div class="tile-icon">
          <figure class="avatar avatar-lg">
            <img src="//picturepan2.github.io/spectre/img/avatar-2.png" alt="Avatar"/>
          </figure>
        </div>
        <div class="tile-content">
          <p class="tile-title">The Avengers</p>
          <p class="tile-subtitle">Earth's Mightiest Heroes joined forces to take on
      threats that were too big for any one hero to tackle...</p>
          <div class="bar bar-sm">
            <div class="bar-item" role="progressbar" style="width:25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div class="tile-action">
          <button class="btn btn-primary" >Update</button>
          <button class="btn">X</button>
        </div>
      </div>
    </div>
  )
}
const Contacts = () => () => {
  const people = 8
  const p = people
  const days = 28
  const expected = people * days / 7

  const r = 100
  const randArray = ({ length, r }) => Array.from({ length }, () => Math.floor(Math.random() * r)).sort((a, b) => a - b)
  const randArroBreaks = Array.from(
    { length: 10 },
    () => randArray({ length: Math.floor(Math.random() * 40),
      r: Math.floor(Math.random() * r) })
  )

  return (<ul>
    <li>
      <Bullet
        _width={100} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[0]}/>
    </li>
    <li>
      <Bullet
        _width={150} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[1]}/>
    </li>
    <li>
      <Bullet
        _width={200} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[2]}/>
    </li>
    <li>
      <Bullet
        _width={250} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[3]}/>
    </li>
    <li>
      <Bullet
        _width={300} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[4]}/>
    </li>
    <li>
      <Bullet
        _width={350} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[5]}/>
    </li>
    <li>
      <Bullet
        _width={400} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[6]}/>
    </li>
    <li>
      <Bullet
        _width={450} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[7]}/>
    </li>
    <li>
      <Bullet
        _width={500} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[8]}/>
    </li>
    <li>
      <Bullet
        _width={550} max={r}
        actual={Math.floor(Math.random() * r)}
        target={Math.floor(Math.random() * r)}
        breaks={randArroBreaks[9]}/>
    </li>
    <li>
      <Bullet
        _height={60} actual={730}
        target={630} max={650}
        breaks={[100, 120, 140, 180, 260, 500, 400, 220, 365]}/>
    </li>
    <li>
      <Bullet
        _height={30} actual={210}
        target={250} max={300}
        breaks={[105, 155, 208]}/>
    </li>
    <li>
      <Bullet
        _height={40} actual={200}
        target={320} max={400}
        breaks={[100, 200, 300]}/>
    </li>
    <li>
      <Bullet
        _height={50} actual={200}
        target={343} max={500}
        forecast={340}
        breaks={[100, 400, 200, 300]}/>
    </li>
    <li>
      <Bullet
        _height={70} actual={75}
        target={65} max={100}
        breaks={[10, 25, 40, 57]}/>
    </li>
    <li>
      <Bullet
        _height={35} actual={expected - 2}
        target={expected} max={expected + 10}
        breaks={[p, p * 1.5, p * 2.5, p * 3.5]}/>
    </li>
    <li>
      <Bullet
        _width={500} _height={22} max={55}
        actual={34} target={40}
        breaks={[ 8, 12, 20, 28, 34 ]}/>
    </li>
  </ul>)
}
const Activity = () => () => {
  const calendarData = CalendarData()
  return (

    <div class="calendar calendar-lg">
      {/*
        ToDo
        - tooltip = from server
        - range = DOM selections
        - appt/Events = from server
        */}
      <div class="calendar-nav navbar">
        <button class="btn btn-action btn-link btn-lg">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div class="navbar-primary">{`${calendarData.header.mm} ${calendarData.header.y}`}</div>
        <button class="btn btn-action btn-link btn-lg">
          <i class="icon icon-arrow-right"></i>
        </button>
      </div>

      <div class="calendar-container">
        <div class="calendar-header">
          {calendarData.header.daysOfWeek.map(v => <div class="calendar-date">{v}</div>)}
        </div>

        <div class="calendar-body">
          {calendarData.days.map(v =>
            <div
              class={
                cc({ 'calendar-date': true,
                  'prev-month': v.monthIdx === -1,
                  'next-month': v.monthIdx === 1 })}>
              <button class={cc({ 'date-item': true, 'date-today': v.today })}>{v.d}</button>
            </div>
          )}

        </div>
      </div>
    </div>)
}

// const Feedback = () => () => {
//   return true
// }

export const Home = ({ match }) => () => {
  // use this little data helper
  // const nav = [
  //   { '/': { label: 'Home', comp: null } },
  //   { '/goals': { label: 'Goals', comp: Goals } },
  //   { '/activity': { label: 'Activity', comp: Activity } },
  //   { '/contacts': { label: 'Contact List', comp: Contacts } }
  // ]

  // console.log({ path: match.path, url: match.url })
  // console.log((nav.map(v => Object.keys(v)[0])))

  return (
    <div style="margin: 10px 0;">
      <ul style="margin: 0 0 10px 0;" class="tab tab-block">
        <li class="tab-item active">
          <Link to={`${match.url}goals`}>Goals</Link>
        </li>
        <li class="tab-item">
          <Link to={`${match.url}contacts`}
            class="badge" data-badge="9" >Contact List</Link>
          <Link to="#" ></Link>
        </li>
        <li class="tab-item">
          <Link to={`${match.url}activity`}>Activity</Link>
        </li>
      </ul>
      <Route parent path={`${match.path}goals`} render={Goals} />
      <Route parent path={`${match.path}activity`} render={Activity} />
      <Route parent path={`${match.path}contacts`} render={Contacts} />
    </div>
  )
}
