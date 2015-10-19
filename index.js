if( typeof window !== 'undefined' && window.Roof !== undefined){

  module.exports = window.Roof

}else{

  var Bus =require("roof-bus/lib/index.js")
  var Node = require("roof-node/compatible/node.js")
  var Nodes = require("roof-node/compatible/nodes.js")
  var Util = require("./util/util.js")

  var Roof = {}
  Roof.Bus = Bus
  Roof.Node = Node
  Roof.Nodes = Nodes
  Roof.Util = Util

  if( typeof window !== 'undefined' ){
    window.Roof = Roof
  }

  module.exports = Roof
}




