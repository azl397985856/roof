var Todos = require("../common/type/todo").Nodes
var me = require("./me")


var todos


//if you want to set default data.
//set it here, so it can be rendered by server in first page
if( me.get("id") ){
  todos = new Todos(null,{
    pattern : {
      //<-[CREATE]-(User {id:`me.get("id")`})
      hasRelation : {
        type : "CREATE",
        reverse : true,
        target : {
          label : "User",
          id : me.get("id")
        }
      },
      //<-[ASSIGNED_TO]-(User)
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
  todos = new Todos()
}


module.exports = todos