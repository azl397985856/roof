var Node = require("../../../src/node")
var Nodes= require("../../../src/nodes")
var Todo = Node( {} )
var Todos = Nodes(Todo)

module.exports = {
  Node: Todo,
  Nodes : Todos
}