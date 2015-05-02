var Todos = require("./type/todo").Nodes
var me = require("./me")
var todos = Todos.new()


if( me.get("id") ){
  //TODO fetch from server
}


module.exports = todos