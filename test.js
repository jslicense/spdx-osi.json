// Check that each string in the exported array is an SPDX license expression.

var assert = require('assert')
var parse = require('spdx-expression-parse')
var osi = require('./')

osi
  .forEach(function(identifier) {
    assert.doesNotThrow(
      function() { parse(identifier) },
      ( identifier + ' is a valid SPDX identifier' )) })

// Check that every SPDX identifier marked as OSI-approved by SPDX is included
// in the exported array.

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
          .filter(function(id) { return !/\+$/.test(id) })
          .reduce(
            function(missing, id) {
              return (
                ( osi.indexOf(id) >= 0 ) ?
                  missing :
                  missing.concat(id) ) },
            [ ]),
        [ 'MIT-0' ]) }) })
