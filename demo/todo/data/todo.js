var roof = require("roof")
var Nodes = roof.Nodes

var todoDef = require("../../common/model/todo")
var Todos = Nodes.derive( todoDef )
var todos = new Todos()

//get the initial data
//todos.fetch("MATCH (todo)-[ASSIGNED_TO]->(user {id:1})")

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

http://localhost/todo?hasRelation={user:1}

//sub from server
//todos.sub(2000)

module.exports = todos