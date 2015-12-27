var assert = require('assert')
var osi = require('./')
var https = require('https')
var spdx = 'https://spdx.org/licenses/licenses.json'

https.get(spdx, function(response) {
  var json = ''
  response
    .on('data', function(buffer) {
      json += buffer.toString() })
    .on('end', function() {
      JSON.parse(json)
        .licenses
        .filter(function(license) {
          return license.isOsiApproved })
        .forEach(function(listedLicense) {
          assert(
            ( osi.indexOf(listedLicense) >= 0 ),
            listedLicense.licenseId + ' is listed as OSI approved, but not in list') })}) })
