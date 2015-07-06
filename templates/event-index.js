'use strict';

require('roof/lib/polyfill.js');

var Bus = require('roof').Bus;
var modules = require('../roof.json').modules.events;
var bus = new Bus();

modules.forEach(function(moduleName) {
  bus._module.set(moduleName);
  require('./' + moduleName + '.js')(bus);
});

module.exports = bus;
