var Node = require("roof-node/lib/node")
var Nodes= require("roof-node/lib/nodes")
var Group = Node.createClass( {} )
var Groups = Nodes.createClass(Group)

module.exports = {
  Node: Group,
  Nodes : Groups
}