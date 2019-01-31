/**
 * Entry point for the SP Application
 *
 * @author: Eric Moore <eric@beccamail.org>
 * @module entry/index
 */

// import cc from 'classcat'
// import './index.css'

// this is v2 - requires lots of re-wrtite to conform to new spec
// import { app, h } from './hyperapp.js'

// import '@babel/polyfill'
import { app, h } from 'hyperapp'
import { DataState } from './state.js'

import { Link, Route, Switch, Redirect, location } from '../node_modules/@hyperapp/router' //eslint-disable-line

import { Title, List } from './comps/classViews/anniversaries.comp.js' //eslint-disable-line
import { Login } from './comps/Login.js'
import { Home } from './comps/home.js'
import { Table } from './comps/table.js'
import { Navbar } from './comps/Navbar.js'
import { Splash } from './comps/Splash.js'
import { Humaaans } from './comps/Humaaans.js'
import { ArtSplash1 } from './comps/ArtSplash1.js'
import { RequestAcct } from './comps/RequestAcct.js'
import * as allActions from './actions'

// @import url('https://fonts.googleapis.com/css?family=Crimson+Text:600|Lato:300');
// import './styles/fonts.css'
// import spectre from 'spectre.css/src/spectre.scss'
// import spectreIcons from '../node_modules/spectre.css/src/spectre-icons.scss'
// import spectreExp from '../node_modules/spectre.css/src/spectre-exp.scss'

// import * as OfflinePluginRuntime from 'offline-plugin/runtime'
// OfflinePluginRuntime.install()

// console.log(spectreCssCore)

let state = {
  count: 0,
  location: location.state,
  ...DataState
}

const actions = {
  reset: () => ({ count: 0 }),
  sum: data => ({ count }) => ({ count: count + data }),
  setFilter: _filter => () => ({ filter: _filter }),
  resetFilter: () => () => ({ filter: '' }),
  location: location.actions,
  deepSet: (path, value) => { return { [path]: value } },
  ...allActions
}

/**
 * The About Function.
 *
 * @description Some other Description
 * @example
 * About()
 * @returns {*} JSX.
 */
const About = () => {
  // console.log(arguments)
  return (<h2>About</h2>)
}

/**
 * Topic Functoin.
 *
 * @description Some other Description
 * @example
 * Topic()
 * @returns {*} JSX.
 */
const Topic = () => {
  // { match }
  // let retFn = {}

  // switch (match.params.topicId) {
  //   case 'anniversary':
  //     retFn = Anniversary
  //     break
  //   case 'something':
  //     console.log('found something')
  //   default:
  //     console.log('This is the default')
  // }
  return (
    <div>
      <Title/>
      <List/>
    </div>
  )
}

/**
 * Title for the ClassView.
 *
 * @description The ClassView description
 * @example
 * // The ClassView Example
 * ClassView({match:'/'})
 *
 * @param {Object} opt - Options.
 * @param {string} opt.match - URL Match.
 * @returns {*} JSX.
 */
const ClassView = ({ match }) => {
  // console.log(`TopicsView ::`)
  // console.log(arguments)
  console.log({ path: match.path, url: match.url })
  return (
    <div key="topics">
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/anniversary`}>Anniversaries</Link>
        </li>
        <li>
          <Link to={`${match.url}/single-state-tree`}>Single State Tree</Link>
        </li>
        <li>
          <Link to={`${match.url}/routing`}>Routing</Link>
        </li>
      </ul>

      {match.isExact && <h3>Please select a topic.</h3>}

      <Route parent path={`${match.path}/:topicId`} render={Topic} />
    </div>
  )
}

/**
 * Help is a view.
 *
 * @description descr
 * @example
 *  Help()
 * @returns {*} JSX.
 */
const Help = () => {
  // console.log(arguments)
  return (
    <h2>Hey There Need Help?</h2>
  )
}

/**
 * This is a Title?
 *
 * @description asdasd.
 * @example
 *   view({state:''}, {action:''})
 * @param {Object} state - Descriip.
 * @param {Object} actions - Descriip.
 * @returns {*} JSX.
 */
const view = (state, actions) => ( // eslint-disable-line
  <main>
    <div class="container grid-lg">
      <Navbar/>
      <Switch>
        <Route path="/outreach" render={Table} />
        <Route path="/attendance" render={Help} />
        <Route path="/birthdays" render={About} />
        <Route path="/anniversaries" render={Help} />
        <Route path="/settings" render={About} />
        <Route path="/about" render={About} />
        <Route path="/help" render={Help} />
        <Route path="/splash" render={Splash} />
        <Route path="/humaaans" render={Humaaans} />
        <Route path="/splash3" render={ArtSplash1} />
        <Route path="/request" render={RequestAcct} />
        <Route path="/login" render={Login} />
        <Route parent path="/classes" render={ClassView} />
        <Route parent path="/" render={Home} />
        <Route render={Home} />
      </Switch>
    </div>
  </main>
)
let main = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location) // eslint-disable-line

// console.log(process.env.APIROOT)
