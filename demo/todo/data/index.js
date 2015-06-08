var _ = require("lodash")
var RoofMixin = require("roof-node/mixin/react.js")
var dataNames = require("./modules.js")

var source = _.zipObject( dataNames, dataNames.map(function(name){return require("./"+name)}))


function mixinFactory( mixinDef ){
  return new RoofMixin(source, mixinDef)
}

module.exports = mixinFactory

module.exports.source = source
