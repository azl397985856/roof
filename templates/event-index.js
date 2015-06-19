'use strict';
require('babel-core/polyfill.js');

import {Bus} from "roof"
console.log( Bus)
let modules = require('../roof.json').modules.events;
let bus = new Bus();

modules.forEach(function(moduleName) {
  bus._module.set(moduleName);
  require('./' + moduleName + '.js')(bus);
});

module.exports = bus;
