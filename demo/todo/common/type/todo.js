var Node = require("roof-node/lib/node")
var Nodes= require("roof-node/lib/nodes")

var TodoMiddleware = require("../middleware/todo")

var Todo = Node.createClass( {},{middleware:TodoMiddleware.Node})
var Todos = Nodes.createClass(Todo,{middleware:TodoMiddleware.Nodes})

module.exports = {
  Node: Todo,
  Nodes : Todos
}