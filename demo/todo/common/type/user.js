var Node = require("roof-node/src/node")
var Nodes= require("roof-node/src/nodes")
var User = Node.createClass( {} )
var Users = Nodes.createClass(User)

module.exports = {
  Node: User,
  Nodes : Users
}