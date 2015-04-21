var Promise = require("bluebird")
var _ = require("lodash")
var States = require("./states")
var util = require("./util")


//global values
var NodesActionTense = {
  'push':['unpushed','pushing','pushed'],
  'pull':['unpulled','pulling','pulled'],
  'verify':['unverified','verifying','verified'],
  'set':['unset','setting','set'],
  'commit':['uncommitted','committing','committed'],
  'rollback':['unrollbacked','rollbacking','rollbacked'],
  'fill' : ['unfilled','filling','filled'],
  'insert' : ['uninserted','inserting','inserted'],
  'update' : ['unupdated','updating','updated'],
  'remove' : ['unremoved','removing','removed']
}

var NodesActions = Object.keys(NodesActionTense)

function Nodes( factory, options ){
  return new SubNodes( factory, _.cloneDeep(options) )
}

function SubNodes( factory, options ){
  var that = this
  this.factory = factory
  this.options = options || {}
  if( this.options.facade ){
    _.forEach(this.options.facade, function( fn, name ){
      that[name] = fn.bind(that)
    })
  }
}

//facade methods
SubNodes.prototype.insert = function(){
  console.warn("you should use your own facade method")
}
SubNodes.prototype.update= function(){
  console.warn("you should use your own facade method")
}
SubNodes.prototype.remove= function(){
  console.warn("you should use your own facade method")
}

SubNodes.prototype.combine = function( combine ){
  this.options.combine = combine
}

SubNodes.prototype.new = function( options ){
  return new NodesInstance(this.factory, _.defaults( options || {}, this.options) )
}





function NodesInstance( factory, options ){
  var that = this
  this.options = options ||{}
  this.factory = factory
  this.updated = false
  this.states = {}
  this.data = []


  that.states = new States({
    tenses:NodesActionTense,
    naive : {
      "valid" : ["valid","invalid"],
      "clean" : ["clean","dirty"] //whether data is changed since last update from server
    },
  })

  if( that.options.combine ){
    that.combine( that.options.combine )
  }

  //load middlewares
  if( that.options.middleware ){
    if( !_.isArray( that.options.middleware ) ){
      that.options.middleware = [that.options.middleware]
    }
    that.middlewareActions = util.loadMiddlewareActions(that.options.middleware)
  }
}

NodesInstance.prototype.fill = function( collection ){
  var that = this
  collection.forEach(function( node ){
    that.insert( node )
  })
  return this
}

NodesInstance.prototype.clone = function( cloneData ){
  var newNodes = new NodesInstance(this.def, this.options)
  if( cloneData ){
    newNodes.fill( this.data.map(function( node){ return  node.clone() }) )
  }
  return newNodes
}

NodesInstance.prototype.insert = function( data, index ) {
  index = index || 0
  if( _.isPlainObject( data) && this.factory ){
    data = this.factory.new( data )
  }
  this.data = this.data.slice(0, index ).concat( data, this.data.slice(index)  )
}

//TODO Query Object and Modifier Object EJSON


NodesInstance.prototype.update = function( where, updateEJSON) {
  this.data.forEach(function( node ){
    if( util.objectMatch( node.toObject, where) ){
      node.set(updateEJSON)
    }
  })
}

NodesInstance.prototype.remove= function(where) {
  var that = this
  this.data.forEach(function( node, index ){
    if( util.objectMatch( node.toObject, where) ){
      that.data[index] = false
    }
  })
  that.data = _.compact( that.data )
}

NodesInstance.prototype.pull= function() {}
NodesInstance.prototype.push= function() {}
NodesInstance.prototype.verify= function() {}

NodesInstance.prototype.commit= function() {}
NodesInstance.prototype.rollback= function() {}


NodesInstance.prototype.find=NodesInstance.prototype.filter =  function() {
  var filteredNodes = this.data.filter.apply(this.data, arguments)
  var newNodesInstance = this.clone( false )
  newNodesInstance.fill( filteredNodes )
  return newNodesInstance
}


NodesInstance.prototype.is =function(){
  return this.states.is.apply(this.states, Array.prototype.slice.call(arguments))
}

NodesInstance.prototype.findOne= function(where) {
  console.log( where)
  for( var i = 0; i<this.data.length;i++){
    if( util.objectMatch(this.data[i].toObject(), where) ){
      return this.data[i]
    }
  }
  return null;
}

NodesInstance.prototype.forEach= function() {
  this.data.forEach.apply(this.data, arguments)
}

NodesInstance.prototype.every= function() {
  this.data.every.apply(this.data, arguments)
}
NodesInstance.prototype.any= function() {
  this.data.any.apply(this.data, arguments)
}


//this is important
NodesActions.forEach(function( action){
  util.decorateWithMiddleware( NodesInstance.prototype, action)
  util.decorateWithState( NodesInstance.prototype, action)
})

module.exports = Nodes



