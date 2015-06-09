var Node = require("roof-node/lib/node")
var Nodes= require("roof-node/lib/nodes")
var User = Node.createClass( {} )
var Users = Nodes.createClass(User)

module.exports = {
  Node: User,
  Nodes : Users
}