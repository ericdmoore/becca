/**
 * Actions for dealing with authentication and user credentials
 * @author: Eric Moore <eric@beccamail.org>
 * @module comps/Monolith
 */

import { h } from 'hyperapp'
// import '../../node_modules/spectre.css/src/_variables.scss'
// import '../../node_modules/spectre.css/src/_navbar.scss'
// import '../../node_modules/spectre.css/dist/spectre.min.css'
import { Link, Route, Switch, Redirect, location } from '@hyperapp/router' //eslint-disable-line

export const Monolith = () => (state, actions) => {
  console.log({ state, actions })
  return (<div>
    {/* <Navbar/> */}
    <ClassTable/>
  </div>)
}

const Navbar = () => () => {
  // make the navbar reflect the state of logged in
  // loggd in gets the full nav bar..
  // otherwise just show the top Becca option
  return (
    <header style="margin:10px 0;" class="navbar">
      <section class="navbar-section">
        <Link class="navbar-brand mr-2" to="/">Becca</Link>
        <Link class="btn btn-link" to="/classes">Classes</Link>
        <Link class="btn btn-link" to="/outreach">Outreach</Link>
        <Link class="btn btn-link" to="/attendance">Attendance</Link>
        <Link class="btn btn-link" to="/birthdays">Birthdays</Link>
        <Link class="btn btn-link" to="/anniversaries">Anniversaries</Link>
        <Link class="btn btn-link" to="/settings">Settings</Link>
        <Link class="btn btn-link" to="/help">Help</Link>
      </section>
      <section class="navbar-section">
        <div class="input-group input-inline">
          <input class="form-input" type="text" placeholder="search"/>
          <button class="btn btn-primary input-group-btn">Search</button>
        </div>
      </section>
    </header>
  )
}

const Login = () => () => (
  <div class="form-group">
    <label class="form-label" for="input-example-1">User</label>
    <input class="form-input" type="text" id="input-example-1" placeholder="Username"/>
    <label class="form-label" for="input-example-1">Password</label>
    <input class="form-input" type="text" id="input-example-1" placeholder="hopefullynotpassword1"/>
  </div>
)
