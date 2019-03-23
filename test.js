// Check that each string in the exported array is an SPDX license expression.
var parse = require('spdx-expression-parse')
var osi = require('./')

var invalid = []
osi.forEach(function (identifier) {
  try {
    parse(identifier)
  } catch (e) {
    invalid.push(identifier)
  }
})

if (invalid.length) {
  invalid.forEach(function (identifier) {
    console.error('Invalid Identifier: ' + identifier)
  })
  process.exit(1)
}
