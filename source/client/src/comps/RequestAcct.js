/**
 * @author: Eric Moore <eric@openorg.institute>
 * @module comps/RequestAcct
 */

/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Link, Route, Switch, Redirect, location } from '@hyperapp/router' //eslint-disable-line
/* eslint-enable no-unused-vars */
import cc from 'classcat'

/**
 * RequestAccount Hyperapp view.
 *
 * @description asdf.
 * @example
 * var a = RequestAcct()
 * a({state:''}, {actions:''})
 * @returns {function(function({Object},{Object}))} A Hyperapp render function.
 */
export const RequestAcct = () => (state, actions) => {
  return (
    <div class="form-group">

      <input type="text" name="honey" id="honey" value="" style="display:none"></input>

      <label class="form-label" for="input-example-1">Username</label>
      <input
        id="ChurchDBUserName" type='text'
        class="form-input"
        value={state.credentials.user}
        placeholder="ChurchDB Username"
        aria-label="ChurchDB Username"
        oncreate={element => element.focus()}
        // onkeyup={({ target: { value }, keyCode }) => keyCode === 13 && value !== '' ? actions.add() : null}
        oninput={({ target: { value } }) => actions.setUsername(value)}
      />

      <label class="form-label" for="input-example-1">Email</label>
      <input
        id="" type="password"
        class="form-input"
        placeholder="Amazing_Grace_1789@yahoo.com"
        aria-label=" Email"
        oninput={({ target: { value } }) => actions.setUserPassword(value)}
      />
      <input type="hidden" name="hiddden" value="Password"/>

      <div style='display:flex; justify-content:space-evenly; margin: 10px 0;'>
        <button
          class={cc(['btn btn-primary',
            { 'loading': state.credentials.isLoading },
            { 'disabled': state.credentials.isLoading || state.credentials.user.length === 0 || state.credentials.pass.length === 0 }])}
          onclick={() => actions.loginSubmitted()}>
          Login
        </button>
        <a href="#">I Have Amnesia</a>
      </div>
    </div>
  )
}
