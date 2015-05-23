var Node = require("../../../../src/node")
var Nodes= require("../../../../src/nodes")
var User = Node.createClass( {} )
var Users = Nodes.createClass(User)

module.exports = {
  Node: User,
  Nodes : Users
}