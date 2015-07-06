'use strict';

function zipObject(keys, values) {
  var output = {};
  for (var i in keys) {
    output[keys[i]] = values[i];
  }
  return output;
}

var dataNames = require('../roof.json').modules.data;
var dataModules = zipObject(dataNames, dataNames.map(function(dataName) {
  return require('./' + dataName);
}));


var exports = require('roof/lib/data-initializer.js')
exports( dataModules )

module.exports = exports
