var assert = require('assert')
var osi = require('./')
var https = require('https')

var spdx = 'https://spdx.org/licenses/licenses.json'
var buffers = [ ]

https.get(spdx, function(response) {
  response
    .on('data', function(buffer) {
      buffers.push(buffer) })
    .on('end', function() {
      assert.deepEqual(
        JSON.parse(Buffer.concat(buffers))
          .licenses
          .filter(function(license) { return license.isOsiApproved })
          .map(function(license) { return license.licenseId })
          .reduce(
            function(missing, id) {
              return (
                ( osi.indexOf(id) >= 0 ) ?
                  missing :
                  missing.concat(id) ) },
            [ ]),
        [ ]) }) })
