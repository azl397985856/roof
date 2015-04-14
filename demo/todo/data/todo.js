var roof = require("roof")

var me = require("./me")

var todoDef = require("../../common/model/todo")
var Todos = roof.Nodes( todoDef )
var todos = Todos.new()

//get the initial data
//todos.fetch("MATCH (todo)-[ASSIGNED_TO]->(user {id:1})")

function fetchData(){
  todos.fetch({
    hasRelation : {
      direction : "advance",
      props : {
        type : "ASSIGNED_TO"
      },
      target : {
        label : "User",
        props : {
          id : me.get("id")
        }
      }
    }
  })

  //http://localhost/todo?hasRelation={user:1}
  //sub from server
  //todos.sub(2000)
}

if( me.get("id") ){
  fetchData()
}else{
  me.on("pulled",function(){
    fetchData()
  })
}

module.exports = todos