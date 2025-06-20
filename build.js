var https = require('https')
var SPDX_URL = 'https://spdx.org/licenses/licenses.json'
var ids = {}

https.get(SPDX_URL, function (response) {
  var chunks = []
  response
    .on('data', function (chunk) {
      chunks.push(chunk)
    })
    .once('error', function (error) {
      console.error(error)
      process.exit(1)
    })
    .once('end', function () {
      var body = Buffer.concat(chunks)
      var parsed = JSON.parse(body)
      ids.spdx = parsed.licenses
        .filter(function (license) {
          return license.isOsiApproved
        })
        .filter(function (license) {
          return license.licenseId.indexOf(' WITH ') === -1
        })
        .map(function (license) {
          return license.licenseId
        })
        .sort()
      if (ids.osi) compare()
    })
})

var OSI_URL = 'https://opensource.org/api/license'
https.get(OSI_URL, function (response) {
  var chunks = []
  response
    .on('data', function (chunk) {
      chunks.push(chunk)
    })
    .once('error', function (error) {
      console.error(error)
      process.exit(1)
    })
    .once('end', function () {
      var body = Buffer.concat(chunks)
      var parsed = JSON.parse(body)
      ids.osi = parsed
        .map(function (license) {
          return license.id
        })
        .sort()
      if (ids.spdx) compare()
    })
})

function compare () {
  console.log(ids)
  var combined = []
  ;[ids.spdx, ids.osi].forEach(function (list) {
    list.forEach(function (id) {
      if (combined.indexOf(id) === -1) combined.push(id)
    })
  })
  combined.sort()
  console.log(JSON.stringify(combined, null, 2))
}
