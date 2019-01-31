/**
 * Actions for dealing with authentication and user credentials
 * @author: Eric Moore <eric@beccamail.org>
 * @module comps/Navbar
 */

import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
//eslint-disable-line

import BeccaLogo from '../../static/icons/Becca-Logo.svg'

/**
 * @author Eric Moore <eric@openorg.institue>
 * @module comps/Navbar
 */

/**
 * Navbar JSX View Funciton.
 *
 * @description The navbar displays a set of links that are somewhat dyanmic to the application state
 * @example
 * haview = Navbar(null)
 * haview({state:true})
 * @returns {function({Object}): string} Returns the HA component funciton.
 */
export const Navbar = () => (state) => {
  // make the navbar reflect the state of logged in
  // loggd in gets the full nav bar..
  // otherwise just show the top Becca option

  // console.log({ loc: state.location })

  if (state.credentials.jwt) { // logged in
    return (
      <header style="margin:10px 0;" class="navbar">
        <section class="navbar-section">
          <Link class="navbar-brand mr-2" to="/"> <img height={30} src={BeccaLogo}></img></Link>
          {/* <Link class="btn btn-link" to="/classes">Classes</Link> */}
          <Link class="btn btn-link" to="/outreach">Outreach</Link>
          <Link class="btn btn-link" to="/attendance">Attendance</Link>
          <Link class="btn btn-link" to="/birthdays">Birthdays</Link>
          <Link class="btn btn-link" to="/anniversaries">Anniversaries</Link>
          <Link class="btn btn-link" to="/settings">Settings</Link>
          <Link class="btn btn-link" to="/about">About</Link>
          <Link class="btn btn-link" to="/help">Help</Link>
          <Link class="btn btn-link" to="/logout">Logout</Link>
        </section>
      </header>
    )
  } else { // no valid user
    return (
      <header style="margin:10px 0;" class="navbar">
        <section class="navbar-section">
          <Link class="btn btn-link" to="/request" >Request Account</Link>
          <Link class="btn btn-link" to="/splash" >Exmaple Page</Link>
        </section>
        <section class="navbar-center">
          <Link to="/">
            <img height={35} src={BeccaLogo}></img>
          </Link>
        </section>
        <section class="navbar-section">
          <Link class="btn btn-link" to="/login">Login</Link>
        </section>
      </header>
    )
  }
}
