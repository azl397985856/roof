var localTodos = require("../data").source.asCreatorTodos


module.exports = function( bus ){
  bus.module("todo")

  bus.on("todo.create",function createTodo( todo ){
    //alert("你正在创建新todo:"+todo.get("content"))
    var promise = todo.push()
    promise.block = true
    return promise
  })

  bus.on("todo.create",{
    "function":function updateLocalTodos( todo){
      localTodos.insert( todo )
    },
    "last" : true
  })

}
