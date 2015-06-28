'use strict';

require('roof/lib/polyfill.js');

let Bus = require('roof').Bus;
let modules = require('../roof.json').modules.events;
let bus = new Bus();

modules.forEach(function(moduleName) {
  bus._module.set(moduleName);
  require('./' + moduleName + '.js')(bus);
});

module.exports = bus;
