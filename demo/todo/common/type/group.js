var Node = require("roof-node/src/node")
var Nodes= require("roof-node/src/nodes")
var Group = Node.createClass( {} )
var Groups = Nodes.createClass(Group)

module.exports = {
  Node: Group,
  Nodes : Groups
}