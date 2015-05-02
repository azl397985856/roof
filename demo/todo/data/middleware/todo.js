var Promise = require("bluebird")
var me = require("../me")


module.exports = {
  Nodes: {
    pull: {
      fn : function fakePull() {
        var that = this
        var amount = 5
        var tasks = []
        var creator,executer


        if( that.options.pattern.hasRelation && that.options.pattern.hasRelation.type === "CREATED" ){
          if( that.options.pattern.hasRelation.target.id === me.get("id")){
            creator = me
          }else{
            creator = randomUser( that.options.pattern.hasRelation.target.id )
          }
        }

        if( that.options.pattern.withRelation && that.options.pattern.withRelation.type === "ASSINGED_TO" ) {
          executer = randomUser()
        }

        while( amount-- ){
          tasks.push( randomTask(  creator, executer ) )
        }


        return new Promise(function (resolve) {
          setTimeout(function () {
            that.fill(tasks)
            resolve(tasks)
          }, 4000)
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