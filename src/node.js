var Promise = require("bluebird")
var _ = require("lodash")
var Frames = require("./frames")
var States = require("./states")


//global values
var NodeActionTense = {
  'push':['unpushed','pushing','pushed'],
  'pull':['unpulled','pulling','pulled'],
  'set':['unset','setting','set'],
  'verify':['unverified','verifying','verified'],
  'commit':['uncommitted','committing','committed'],
  'rollback':['unrollbacked','rollbacking','rollbacked'],
  'replace' : ['unreplaced','replacing','replaced']
}

var NodeActions = Object.keys(NodeActionTense)

function Node( def, options ){
  return new SubNode( def, _.cloneDeep(options) )
}

function SubNode( def, options ){
  this.def = def || {}
  this.options = options || {}
}

SubNode.prototype.combine = function( combine ){
  this.options.combine = combine
}

SubNode.prototype.new = function( options ){
  return new NodeInstance(this.def, _.defaults( options || {}, this.options) )
}




function decorateWithState (prototype, action){
  var rawAction = prototype[action]
  prototype[action] = function(){
    var that = this
    var argv = Array.prototype.slice.call(arguments)
    that.states.start(action)
    //don't user Promise.resolve to deal with none Promise result
    //cause the callback invoke in next tick.
    var res = rawAction.apply( that, argv )
    if( res && _.isFunction(res.then) ){
      return res.then(function(){
        that.states.end(action)
      },function(){
        that.states.end(action)
      })
    }else{
      that.states.end(action)
    }
  }
}

function decorateWithMiddleware( prototype, action ){
  var rawAction = prototype[action]
  prototype[action] = function(){
    var that = this
    var argv = Array.prototype.slice.call(arguments)


    if( that.middlewareActions && that.middlewareActions[action] ){

      return Promise.each(["before","fn","after"],function( fnName){
        if( !that.middlewareActions[action][fnName].length ) return true
        var fns = that.middlewareActions[action][fnName]
        //important
        if( fnName === "fn" ) fns.push( rawAction )
        var lastResult
        return Promise.each( fns, function( fn ){
          lastResult = fn.apply( that, [lastResult].concat(argv) )
          return lastResult
        })
      })
    }else{
      //console.log("no middleware loaded for action", action)
      return rawAction.apply( that, arguments)
    }
  }
}

function loadMiddlewareActions( middlewares ){
  var middlewareActions = {}
  var keys =["before","fn","after"]
  middlewares.forEach(function( middleware){
    _.forEach( middleware, function( actionDef, action){
      if( !middlewareActions[action] ){
        middlewareActions[action] = _.zipObject(keys, keys.map(function(){return []}))
      }

      if( _.isFunction(actionDef )){
        middlewareActions[action].fn.push( actionDef )
      }else if( _.isObject( actionDef)){
        keys.forEach(function(key){
          _.isFunction(actionDef[key])  && middlewareActions[action][key].push( actionDef[key] )
        })
      }else{
        console.warn("unrecognized middleware action definition:",actionDef)
      }
    })
  })

  return middlewareActions
}

function NodeInstance( def, options ){
  var that = this
  this.options = options ||{}
  this.def = def
  this.updated = false
  this.states = {}
  this.data = new Frames({limit:options.frames||5})


  that.states = new States({
    tenses:NodeActionTense,
    naive : {
      "valid" : ["valid","invalid"],
      "clean" : ["clean","dirty"] //whether data is changed since last update from server
    }
  })

  if( that.options.combine ){
    that.combine( that.options.combine )
  }

  //load middlewares
  if( that.options.middleware ){
    if( !_.isArray( that.options.middleware ) ){
      that.options.middleware = [that.options.middleware]
    }
    that.middlewareActions = loadMiddlewareActions(that.options.middleware)
  }
}



NodeInstance.prototype.set =function( path, value){
  /*
    TODO
    对所有verified过的数据打一个快照
    这样有改动时既可以和最新的这个快照对比，看看是不是clean的，
    而不是像现在这样只要有改动就设置成dirty
   */
  this.states.deactivate("clean")
  return this.data.set(path, value)
}

NodeInstance.prototype.replace =function( obj ){
  return this.data.replace( obj )
}

NodeInstance.prototype.commit =function( commitName ){
  if( commitName instanceof CombinedArgv ){
    commitName = undefined
  }
  this.data.commit( commitName)
  this.states.reset("set")
}

NodeInstance.prototype.rollback=function( commitName ){
  this.data.rollback(commitName)
  this.states.reset("set")
}

NodeInstance.prototype.get = function(path){
  return this.data.get(path)
}

NodeInstance.prototype.toPlainObject = function(path){
  return this.data.toPlainObject()
}

NodeInstance.prototype.is =function(){
  return this.states.is.apply(this.states, Array.prototype.slice.call(arguments))

}



NodeInstance.prototype.pull =
  NodeInstance.prototype.push =
    NodeInstance.prototype.verify = function( promise ){
  //this function will be called after user's handler
  var that = this
  return promise.then(function(){
    that.states.activate("valid")
  }, function(){
    that.states.deactivate("valid")
  })
}




//this is important
NodeActions.forEach(function( action){
  decorateWithMiddleware( NodeInstance.prototype, action)
  decorateWithState( NodeInstance.prototype, action)
})


NodeInstance.prototype.combine = function( actionsToCombine ){
  //console.log("--")
  if( this.combinedActions ){
    return console.warn("This instance already combined actions:", this.combine)
  }
  var mainAction = actionsToCombine[0]
  var that = this
  that[mainAction] = function(){
    var argv = Array.prototype.slice.call(arguments)
    return Promise.each( actionsToCombine, function(action){
      console.log("calling combined action", action)
      return NodeInstance.prototype[action].call( that, new CombinedArgv( _.clone(actionsToCombine), _.cloneDeep(argv)) )
    })
  }
  this.combinedActions = actionsToCombine
}

function CombinedArgv( combine, argv ){
  var that = this
  argv.forEach(function( v, k ){
    that[k] = v
  })

  that.combine = combine
  that.length = argv.length
}




module.exports = Node