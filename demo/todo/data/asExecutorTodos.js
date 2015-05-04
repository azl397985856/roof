var Todos = require("./type/todo").Nodes
var me = require("./me")


var todos


//if you want to set default data.
//set it here, so it can be rendered by server in first page
if( me.get("id") ){
  todos = Todos.new(null,{
    pattern : {
      //<-[ASSIGNED_TO]-(User {id:`me.get("id")`})
      hasRelation : {
        type : "ASSIGNED_TO",
        reverse : true,
        target : {
          label : "User",
          id : me.get("id")
        }
      },
      //<-[CREATE]-(User)
      withRelation : {
        type : "CREATE",
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