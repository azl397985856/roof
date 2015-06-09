var localTodos = require("../data").source.asCreatorTodos

module.exports = function( bus ){

  bus.on("todo.create",function createTodo( todo ){
    return todo.push()
  })

  bus.on("todo.create",{
    "fn":function updateLocalTodos( todo){
      localTodos.insert( todo.toObject() )
    },
    "waitFor" : "todo.createTodo"
  })
}
