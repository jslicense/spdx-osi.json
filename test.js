var assert = require('assert')
var spdx = require('spdx-license-ids')
var osi = require('./')

osi
  .forEach(function(identifier) {
    assert(
      ( spdx.indexOf(identifier) >= 0 ),
      ( identifier + 'is a valid SPDX identifier' )) })
