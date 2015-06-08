var localTodos = require("../data").source.asCreatorTodos


module.exports = function( bus ){

  bus.on("todo.create",function createTodo( todo ){
    //alert("你正在创建新todo:"+todo.get("content"))
    return todo.push()
  })

  bus.on("todo.create",{
    "fn":function updateLocalTodos( todo){
      console.log("updating local todos")
      localTodos.insert( todo )
    },
    "waitFor" : "todo.createTodo"
  })

}
