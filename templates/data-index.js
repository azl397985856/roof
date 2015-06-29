'use strict';
let assign = require('object-assign');
let RoofMixin = require('roof/lib/mixin/react.js');
let dataNames = require('../roof.json').modules.data;

function zipObject(keys, values){
  let output = {}
  for(let i in keys){
    output[keys[i]] = values[i]
  }
  return output
}

let exportsObj = mixinFactory;

function mixinFactory(mixinDef) {

  if (!exportsObj.isServerRendering) {
    if (Object.keys(exportsObj.source).length === 0) {
      assign(exportsObj.source, zipObject(dataNames, dataNames.map(function(name) {
        return require('./' + name)({context: context});
      })));
    }
  }else {
    // 占位符
    exportsObj.source = {};
  }

  return new RoofMixin(exportsObj.isServerRendering ? exportsObj : exportsObj.source, mixinDef);
}

// for server rendering
exportsObj._serverRenderingData = {};
exportsObj.isServerRendering = false;

exportsObj.setData = function(key, context) {
  exportsObj._serverRenderingData[key] = zipObject(dataNames, dataNames.map(function(name) {
    return require('./' + name)({context: context});
  }));
};

exportsObj.getData = function(key) {
  return exportsObj._serverRenderingData[key];
};

exportsObj.removeData = function(key) {
  delete exportsObj._serverRenderingData[key];
};

//  占位符
exportsObj.source = {};


module.exports = exportsObj;
