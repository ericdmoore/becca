/**
 * Actions for dealing with authentication and user credentials
 * @author: Eric Moore <eric@beccamail.org>
 * @module comps/Login
 */

/* eslint-disable no-unused-vars */
import { h } from 'hyperapp'
import { Link, Route, Switch, Redirect, location } from '@hyperapp/router' //eslint-disable-line
/* eslint-enable no-unused-vars */

import cc from 'classcat'

export const Login = () => (state, actions) => {
  const formIsEmpty = state.credentials.user.length === 0 || state.credentials.pass.length === 0
  return (
    <div>
      <div style={cc([{ 'display:none;': state.errorMsg.length === 0 }])}
        class="toast toast-error">
        <button class="btn btn-clear float-right" onclick={actions.errorMsg('')}></button>
        {state.errorMsg}
      </div>
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
          oninput={({ target: { value } }) => actions.userName(value)}
        />

        <label class="form-label" for="input-example-1">Password</label>
        <input
          id="" type="password"
          class="form-input"
          placeholder="ChurchDB Password"
          aria-label="ChurchDB Password"
          oninput={({ target: { value } }) => actions.userPassword(value)}
        />

        <Checkbox
          label='Keep Me Logged In'
          isActive={state.credentials.stayLoggedIn}
        />

        <input type="hidden" name="hiddden" value="Password"/>

        <div style='display:flex; justify-content:space-evenly;'>
          <button
            class={cc(['btn btn-primary',
              { 'loading': state.credentials.isLoading },
              { 'disabled': state.credentials.isLoading || formIsEmpty }])}
            onclick={() => actions.loginSubmitted(fetch)}>
          Login {/* formIsEmpty ? 'Fill In User/Password' : 'Login' */}
          </button>
          <a href="#">Forgot??</a>

        </div>
        <div style='display:flex; justify-content:space-evenly;'>
          <a href="#">Request An Account</a>
          <a onclick={() => actions.printEverything()}> State Wat?</a>
        </div>
      </div>
    </div>
  )
}

/**
 * A Great Title Here.
 *
 * @description Somethin good.
 * @param {Object} opts - Options.
 * @param {string} [opts.label=''] - Check box text to show the user.
 * @param {boolean} [opts.isActive=false] - The initial state of the checkbox.
 * @param {string} [opts._idInput='stayLoggedIn'] - Give the DOM element an ID.
 * @param {string} [opts._nameInput='stayLoggedIn'] - Check box text to show the user.
 * @example
 * var haComponent = Checkbox()
 * haComponent({state:true}, {actions:true})
 * @returns {function({Object}, {Object}): string} - The chain of curried functions.
 */
const Checkbox = ({ label, isActive, _idInput, _nameInput } =
{ _idInput: 'stayLoggedIn', _nameInput: 'stayLoggedIn', label: '', isActive: false }) => (state, actions) => {
  const checked = () => isActive ? 'checked' : ''

  return (
    <div class="form-group">
      <label class="form-switch">
        <input
          type="checkbox"
          id={_idInput}
          name={_nameInput}
          onclick={() => actions.toggleUserStayLoggedIn()}
          checked={isActive}
        />
        <i class="form-icon"></i> {label}
      </label>
    </div>)
}
