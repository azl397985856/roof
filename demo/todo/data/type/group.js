var Node = require("../../../../src/node")
var Nodes= require("../../../../src/nodes")
var Group = Node.createClass( {} )
var Groups = Nodes.createClass(Group)

module.exports = {
  Node: Group,
  Nodes : Groups
}