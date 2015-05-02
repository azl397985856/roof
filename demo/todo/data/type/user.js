var Node = require("../../../../src/node")
var Nodes= require("../../../../src/nodes")
var User = Node( {} )
var Users = Nodes(User)

module.exports = {
  Node: User,
  Nodes : Users
}