/**
 * Actions for dealing with authentication and user credentials
 * @author: Eric Moore <eric@beccamail.org>
 * @module actions/login
 */
import { deepSet } from './index'

export const userName = username => state => {
  return deepSet('credentials.user', username, state)
  // return { credentials: { ...state.credentials, 'user': username } }
}

export const userPassword = password => state => {
  return deepSet('credentials.pass', password, state)
}

export const errorMsg = (msg) => () => ({
  errorMsg: msg
})

export const setJWT = jwt => (state) => {
  return deepSet('credentials.jwt', jwt, state)
}

export const setUserlogout = () => (state) => {
  return deepSet('credentials.jwt', null, state)
}

export const toggleUserStayLoggedIn = () => state => {
  return deepSet('credentials.stayLoggedIn', !state.credentials.stayLoggedIn, state)
}

export const toggleLoading = (setValue) => (state) => {
  if (setValue === undefined) {
    return deepSet('credentials.isLoading', !state.credentials.isLoading, state)
  } else {
    return deepSet('credentials.isLoading', setValue, state)
  }
}

export const printEverything = () => (state, actions) => {
  console.log({ state, actions })
  return { filter: '' }
}

export const loginSubmitted = () => (state, actions) => {
  // initiate business logic
  // - we're not passing in the user, since state layer should already have the user set
  // - thanks to the disabled login button - until ready
  // - all it would do is readin the state from the view and pass it in as a 1stParam
  // - and is more easily accessed here anyway - as well as not coupling changes in both places
  actions.toggleLoading(true)
  actions._userLogin({ user: state.credentials.user }) //  kicks off async action?
  // actions.toggleLoading(true)
}
export const _userLogin = ({ user }) => async (state, actions) => {
  let id = user // just some fun mangling to make ESLINT happy
  id = '8422599'

  if (state.credentials.user === 'error' || state.credentials.user === 'err') {
  // handle the error case here
    // set new state triggering showing a notification box
    console.warn('Please Try Again - your User & Password did not match')

    actions.toggleLoading(false)
    actions.userName('')
    actions.userPassword('')
    actions.errorMsg('Please Try Again - your User & Password did not match')
  } else {
    // happy
    let res = await fetch(`${process.env.APIROOT}item/${id}.json`).catch(err => console.error(err))
    actions.toggleLoading(false)
    actions.setJWT(res)
    actions.location.go('/birthdays')
  }
  return { credentials: { ...state.credentials, isLoading: false } }
}

export const saveToCookie = () => {
  return true
}

export const ValidateEmail = () => {
  return true
}
