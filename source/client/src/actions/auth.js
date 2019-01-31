/**
 * Actions for sending credentials to the API
 * @author: Eric Moore <eric@openorg.institute>
 * @module actions/auth
 * @see: https://mermaidjs.github.io/sequenceDiagram.html
 * @mermaid
 *   sequenceDiagram
 *      participant C as Client
 *      participant S as Server
 *      C->>S: nullable(GUID)
 *      S->>C: JWT(?GUID) = JWT.1
 *      C->>S: AES(Creds, JWT.1) + {JWT.1}
 *      Note right of S: Security by Obscurity,I know
 *      Note over C,S: Client: replace JTW.1 w/ JWT.2
 *      S->>C: JWT.2(User, HMAC(PASS))
 *      C->>S: API()+JWT.2
 */

/**
 * Generate GUID to start token exchange.
 *
 * @description Ssdf
 * @todo Should the `lsKey` be a randString? I think so!
 * @example
 * GUID(window)
 * @param {Object} window - Shadow scope of window.
 * @param {Object} config - Object with `lsKey` and `clearFirst`.
 * @param {string} config.lsKey - LocalStorage key to use when saving this GUID.
 * @param {boolean} config.clearFirst - Should we clear this key before reading from it? When Caching Data, Always Leave yourself an out.
 * @returns {number} The randomly generated GUID.
 */
export const GUID = (window,
  { lsKey = 'becca:guid', clearFirst = false } = { lsKey: 'becca:guid', clearFirst: false }) => {
  clearFirst && window.localStorage.removeItem(lsKey)
  let guid = window.localStorage.getItem(lsKey) || Math.floor(Math.random() * Math.pow(10, 10))
  window.localStorage.setItem(lsKey, guid)
  return window.localStorage.getItem(lsKey)
}

export const guid = (base, exp) => {
  return Math.floor(Math.random() * Math.pow(base, exp))
}

/**
 * Encrypt user credentials so that they are not in plaintext on the wire.
 *
 * @description Scramble user credentials
 * @example
 * packageCreds(window, {message:'', initialToken:"12345"})
 * @param {Object} window - Pass in the borwser window object.
 * @param {Object} opts - The desired message to send.
 * @param {Object} opts.message - The desired message to send.
 * @param {string} opts.token - The JWT session token.
 * @returns {Buffer} Series of bytes.
 */
export const packageCreds = (window, { message, initialToken }) => async (state, actions) => {
  let windowCrypto = window.crypto || window.msCrypto // for IE 11
  //   let result = windowCrypto.subtle.generateKey(algorithm, extractable, keyUsages)

  return windowCrypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: windowCrypto.getRandomValues(new Uint8Array(16))
    },
    initialToken,
    (new TextEncoder()).encode(message)
  ).then(encData => {
    let base64String = btoa(String.fromCharCode(...new Uint8Array(encData)))
    console.log({ base64String })
    actions.setToken(base64String)
    return base64String
  }).catch(console.error)
}

/**
 * Set the token {jwt} key within application state.
 *
 * @description adf.
 * @example
 * setToken('12341awefasva')
 * @param {string} token - Is the stringified token returned from the API.
 * @returns {Object} A partial state object that is merged in and handled via Hyperapp.
 */
export const setToken = (token) => state => {
  return { credentials: { ...state.credentials, jwt: token } }
}
