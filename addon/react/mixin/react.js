var Roof = require('roof')
var Node = Roof.Node
var Nodes = Roof.Nodes
var React = require('react')

function forEach( obj, handler ){
  for( var i in obj ){
    if( obj.hasOwnProperty(i)){
      handler( obj[i], i)
    }
  }
}

function isArray( arr ){
  return Object.prototype.toString.call(arr) === '[object Array]'
}

function isObject( obj ){
  return typeof obj === 'object'
}

function defaults( def, source ){
  var output = {}
  forEach(def, function( v,k){
    output[k] = v
  })

  forEach(source, function(v,k){
    if( output[k] === undefined ){
      output[k] = v
    }
  })
  return output
}

function mapValues( obj, handler ){
  var output = {}
  forEach( obj, function(v, k){
    output[k] = handler(v, k )
  })
  return output
}

function getRef( obj, name ){
  var ns = !isArray(name) ? name.split('.') : name,
    ref = obj,
    currentName

  while( currentName = ns.shift() ){
    if(isObject(ref) && ref[currentName]){
      ref = ref[currentName]
    }else{
      ref = undefined
      break;
    }
  }

  return ref
}

function getStateProxy( randomKey ){
  var proxyState =  {}
  proxyState[randomKey] = (new Date()).getTime()
  return proxyState
}

function Mixin( data, def ){
  def = defaults(def,{
    attach : "cursors",
    cursors : {},
    source : false
  })

  var randomKey = (new Date()).getTime()
  var mixinInstance = {}
  var updater

  var updateComponentFromDataChange = (function(){
    var willUpdate = false
    return function(randomKey, e){
      //console.log( e)
      if( willUpdate ) return

      willUpdate = true
      window.setTimeout(function(){
        this.setState(getStateProxy(randomKey))
        willUpdate = false
      }.bind(this),0)
    }
  })()

  if( data.isServerRendering === true){
    mixinInstance.contextTypes =  {
      roofServerRenderingKey: React.PropTypes.string.isRequired
    }
  }


  mixinInstance.getInitialState = function(){
    var that = this
    //TODO 支持服务器端渲染
    this[def.attach] = def.source ? data : mapValues( def.cursors, function( name){
      var dataRef
      if( data.isServerRendering === true) {
        //服务器端渲染
        dataRef = getRef(data.getData(that.context.roofServerRenderingKey), name)
      }else{
        //非服务器端渲染
        dataRef = getRef(data, name)
      }
      if (!dataRef) {
        console.warn("you are requiring an undefined cursor:", name, JSON.stringify(data))
      }
      return dataRef
    })

    return getStateProxy(randomKey)
  }

  mixinInstance.componentDidMount = function(){
    var that = this
    updater = updateComponentFromDataChange.bind(that,randomKey)

    var attacher = function(){
      forEach( that[def.attach], function( obj ){
        if(  Node.isNodeInstance(obj)  ||  Nodes.isNodesInstance(obj) ){
          obj.on('change',updater)
          if( Nodes.isNodesInstance( obj )){
            obj.onAny( 'change', updater)
          }
        }
      })
    }

    //TODO 兼容过去的方式
    if( def.source  === true && data._isReady === false){
      this[def.attach].on('ready', function(){
        attacher()
      })
    }else{
      attacher()
    }
  }

  mixinInstance.componentWillUnmount = function(){
    forEach( this[def.attach], function( obj ){
      if(  Node.isNodeInstance(obj)  ||  Nodes.isNodesInstance(obj) ){
        obj.off('change',updater)
        if( Nodes.isNodesInstance( obj )){
          obj.offAny( 'change', updater)
        }
      }
    })
  }

  return mixinInstance
}

module.exports = Mixin;

module.exports.util = {
  handleFormChange : function( data, field, e ){
    data.set(field, e.target.value)
  }
}
