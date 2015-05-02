var Node = require("../../../../src/node")
var Nodes= require("../../../../src/nodes")
var Group = Node( {} )
var Groups = Nodes(Group)

module.exports = {
  Node: Group,
  Nodes : Groups
}