var https = require('https')
var URL = 'https://spdx.org/licenses/licenses.json'

https.get(URL, function (response) {
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
      var ids = parsed.licenses
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
      console.log(JSON.stringify(ids, null, 2))
    })
})
