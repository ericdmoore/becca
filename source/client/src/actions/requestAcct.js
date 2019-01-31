/**
 * Actions for requesting an account
 * @author: Eric Moore <eric@beccamail.org>
 * @module actions/requestAcct
 */

/**
 * Some Other.
 *
 * @example
 * setRequestedUser({user: 'Myname'})
 * @description some desc
 * @param {Object} input - Asd.
 * @param {string} input.user - Asd.
 * @returns {*} Hyperapp render ƒunction.
 */

import bcrypt from 'bcryptjs'
// const bcrypt = require('bcryptjs')

export const setRequestedUser = ({ user }) => state =>
  ({
    requesting: { ...state.requesting,
      user: {
        ...state.requesting.user,
        name: user,
        salt: bcrypt.genSaltSync(10)
      }

    }
  })

export const setRequestedPass = (window, { psword }, factor = 10) => state =>
// covert to an async action that initiate Promise resolution and calls saving Action later
  ({
    requesting: { ...state.requesting,
      pass: {
        word: window.btoa(psword), // save as base64 to mangle it at least a bit - besure to covert back on the server
        bcryptFactor: factor,
        bcryptHash: bcrypt.hashSync(psword, state.requesting.user.salt)
      }
    }
  })
