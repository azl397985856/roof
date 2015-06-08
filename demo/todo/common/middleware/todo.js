var me = require("../me")

module.exports = {
  Nodes: {
    pull: {
      fn : function fakePull() {
        var that = this
        var amount = 5
        var tasks = []
        var creator,executer


        console.log( that.options.pattern.hasRelation )



        while( amount-- ){
          if( that.options.pattern.hasRelation  ){
            if(  that.options.pattern.hasRelation.type === "CREATED" && that.options.pattern.hasRelation.target.id === me.get("id")){
              creator = me
            }else if(that.options.pattern.hasRelation.type === "ASSIGNED_TO" && that.options.pattern.hasRelation.target.id === me.get("id")){
              creator = randomUser( that.options.pattern.hasRelation.target.id )
            }
          }

          if( that.options.pattern.withRelation && that.options.pattern.withRelation.type === "ASSIGNED_TO" ) {
            executer = Math.random() > 0.5 ? randomUser() : me.toObject()
          }

          tasks.push( randomTask(  creator, executer ) )
        }


        return new Promise((resolve) =>{
          setTimeout( () =>{
            this.fill(tasks)
            resolve(tasks)
          }, 100)
        })
      }
    }
  },
  Node : {
    push : {
      fn : function(){
        console.log("pushing todo", JSON.stringify(this.data))
        return new Promise( (resolve)=> {
          setTimeout( ()=> {

            var todo = this.toObject()

            todo.id= (new Date()).getTime()

            todo.relations = {
                CREATE: {
                type : "CREATE",
                  reverse : true,
                  target : _.extend({
                  label : "User"
                },me.toObject())
              }
            }

            if( !this.get("relations.ASSIGNED_TO") ){
              todo.relations.ASSIGNED_TO = {
                type : "ASSIGNED_TO",
                reverse : true,
                target : _.extend({
                  label : "User"
                },me.toObject())
              }
            }

            resolve(todo)
          }, 2000)
        })
      }
    }
  }
}

var id = 0
var tasks = ["football","basketball","shopping","fly a plane","skiing"]

function randomTask(  creator, executor ){
  id++;
  var task =  {
    id : id,
    content : tasks[ Math.floor(Math.random() * tasks.length) ],
    relations : {}
  }

  if( creator ){
    task.relations["CREATE"]={
        type : "CREATE",
        reverse : true,
        target : _.extend({
          label : "User"
        }, creator)
      }
  }
  if( executor ){
    task.relations["ASSIGNED_TO"]={
      type : "ASSIGNED_TO",
      reverse : true,
      target : _.extend({
        label : "User"
      }, executor)
    }
  }
  return task
}


var uid = 0
var name = ["Ultron","Stark","Thor","Evins","Eagle"]
function randomUser( id ){

  var user = {
    id : id || uid++
  }
  user.name  = name[Math.floor(Math.random()*name.length)]
  return user
}