var bus = require("./bus")
var todos = require("./data").select("todos")
var Promise = require("bluebird")
var TodoNode = require("../data/todo").TodoNode
var UserNode = require("../data/me").UserNode


bus.on("todo.create",function( rawTodo){
  var todo = rawTodo
  var executor

  if( rawTodo.executor  ){
    todo = new TodoNode(rawTodo)
    executor = new UserNode(rawTodo.executor )
    todo.relateTo( executor ).as("ASSIGNED_TO")
  }

  Promise.waterfall([
    todos.insert( todo ),
    todos.commit(),
    todos.push()
  ])
})

