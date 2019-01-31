/**
 * Actions for sending messages to class members
 * @author: Eric Moore <eric@beccamail.org>
 * @module actions/messaging
 */

export const setMessage = (message) => {
  if (message) { return true } else return false
}

export const sendMessage = ({ message, list = [] }) => {
  if (message) {
    setMessage(message)
  }
  if (list) {
    // constuct the button/href
    // sms or email
    // android vs iphone
    // wait for it to be pressed...
    // make API call to send( the `state.messageToSend` to everyone in the `list`
    return true
  }
  return true
}
