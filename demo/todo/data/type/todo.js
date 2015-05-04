var Node = require("../../../../src/node")
var Nodes= require("../../../../src/nodes")

var TodoMiddleware = require("../middleware/todo")

var Todo = Node( {},{middleware:TodoMiddleware.Node})
var Todos = Nodes(Todo,{middleware:TodoMiddleware.Nodes})

module.exports = {
  Node: Todo,
  Nodes : Todos
}