var Bus =require("roof-bus/lib/index.js")
var Node = require("roof-node/lib/node")
var Nodes = require("roof-node/lib/nodes")
var Util = require("./util/util")

var Roof = {}
Roof.Bus = Bus
Roof.Node = Node
Roof.Nodes = Nodes
Roof.Util = Util

if( typeof window !== 'undefined' ){
  window.Roof = Roof
}

module.exports = Roof
