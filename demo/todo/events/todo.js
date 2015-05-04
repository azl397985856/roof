
module.exports = function( bus ){
  bus.module("todo")

  bus.on("todo.create",function createTodo( todo ){
    alert("你正在创建新todo:"+todo.get("content"))
    return todo.push()
  })

}
