const debug = require('debug')('prismarine-auth')
const crypto = require('crypto')

async function checkStatus (res) {
  if (res.ok) { // res.status >= 200 && res.status < 300
    return res.json()
  } else {
    const resp = await res.json()
    debug('Request fail', resp)
    throw Error(`${res.statusText}: ${JSON.stringify(resp)}`)
  }
}

function createHash (input) {
  return crypto.createHash('sha1').update(input ?? '', 'binary').digest('hex').substr(0, 6)
}

module.exports = { checkStatus, createHash }
