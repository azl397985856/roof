var Todos = require("./type/todo").Nodes
var me = require("./me")


var todos

if( me.get("id") ){
  todos = Todos.new(null,{
    pattern : {
      hasRelation : {
        type : "CREATE",
        reverse : true,
        target : {
          label : "User",
          id : me.get("id")
        }
      },
      withRelation : {
        type : "ASSIGNED_TO",
        reverse : true,
        target : {
          label : "User"
        }
      }
    }
  })

  // fetch from server
  todos.pull()
  console.log("pulling from server", todos)
}else{
  todos = Todos.new()
}


module.exports = todos