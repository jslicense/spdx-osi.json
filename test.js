var assert = require('assert')
var parse = require('spdx-expression-parse')
var osi = require('./')

osi
  .forEach(function(identifier) {
    assert.doesNotThrow(
      function() { parse(identifier) },
      ( identifier + ' is a valid SPDX identifier' )) })
