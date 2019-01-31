const crypto = require('crypto')

const makeToken = (() => {
  return () => {
    const privateSecret = (new Date()).getTime().toString()
    const hmac = crypto.createHmac('sha256', privateSecret)
    let msg = 'here is a token'
    hmac.update(msg)
    const ret = { token: hmac.digest('hex'), msg, sec: privateSecret }
    console.log(ret)
    return ret
  }
})()

module.exports = { makeToken }
