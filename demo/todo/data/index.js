var _ = require("lodash")
var RoofMixin = require("../../../src/mixin/react.js")
var dataNames = ["me","asCreatorTodos","asExecutorTodos","asCreatorGroups","asMemberGroups","groups","asApplierGroups"]

var source = _.zipObject( dataNames, dataNames.forEach(function(name){ return require("./"+name)}))

function mixinFactory( mixinDef ){
  return new RoofMixin(source, mixinDef)
}

module.exports = mixinFactory

module.exports.source = source
