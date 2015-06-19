'use strict';
let _ = require('lodash');
let RoofMixin = require('roof/node_modules/roof-node/mixin/react.js');
let dataNames = require('../roof.json').modules.data;


let exportsObj = mixinFactory;

function mixinFactory(mixinDef) {

  if (!exportsObj.isServerRendering) {
    if ( Object.keys(exportsObj.source).length === 0 ) {
      _.extend(exportsObj.source , _.zipObject(dataNames, dataNames.map(function(name) {
        return require('./' + name)({context: context});
      })))

      console.log("setting source, ", exportsObj.source)
    }
  }else {
    // 占位符
    exportsObj.source = {};
  }

  console.log( "source", exportsObj.source )
  return new RoofMixin(exportsObj.isServerRendering ? exportsObj : exportsObj.source, mixinDef);
}

// for server rendering
exportsObj._serverRenderingData = {};
exportsObj.isServerRendering = false;

exportsObj.setData = function(key, context) {
  exportsObj._serverRenderingData[key] = _.zipObject(dataNames, dataNames.map(function(name) {
    return require('./' + name)({context: context});
  }));
};

exportsObj.getData = function(key) {
  return exportsObj._serverRenderingData[key];
};

exportsObj.removeData = function(key) {
  delete exportsObj._serverRenderingData[key];
};

//占位符
exportsObj.source = {};


module.exports = exportsObj;
