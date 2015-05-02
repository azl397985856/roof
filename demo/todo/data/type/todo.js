var Node = require("../../../../src/node")
var Nodes= require("../../../../src/nodes")

var TodosMiddleware = require("../middleware/todo").Nodes

var Todo = Node( {} )
var Todos = Nodes(Todo,{middleware:TodosMiddleware})

module.exports = {
  Node: Todo,
  Nodes : Todos
}