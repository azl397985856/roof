
var Roof = require('roof')
var dataInitializer = require('../../lib/data-initializer')
var Bus = require('roof').Bus;

require('../../util/namespace')( Roof, 'addon.react.container')

var React = require('react')
var Mixin = require('./mixin/react.js')

Roof.token = Date.now()

function SourceReadyMixin(source) {
  var forceUpdate

  return {
    componentDidMount: function () {
      forceUpdate = this.forceUpdate.bind(this)
      source.on('ready', forceUpdate)
      source.on('error', forceUpdate)
    },
    componentWillUnmount: function () {
      source.removeListener('ready', forceUpdate)
      source.removeListener('error', forceUpdate)
    }
  }
}


//////////////////////////////////
//         init
//////////////////////////////////


//TODO 因为0.2.x 版本的设计 Roof 是全局唯一的，
// 所以可以把 数据 和事件总线 attach 到 Roof 对象上，
// 这样就能不用 react context 去传递，也不会碰到业务组件不是用 Roof container 创建就不能传递 bus 和 data 的问题。
Roof.init = function( def ){
  if( def.data === undefined ) throw Error('data is not defined when create Roof root container')
  if( def.events === undefined ) throw Error('events is not defined when create Roof root container')


  //初始化数据
  //initializer 直接把数据 attach
  dataInitializer( def.data )
  Roof.source = dataInitializer.source

  //初始化bus

  Roof.bus = new Bus();

  for( var moduleName in def.events ){
    Roof.bus._module.set(moduleName)
    def.events[moduleName](Roof.bus, Roof.source)
  }


}


//////////////////////////////////
//         createContainer
//////////////////////////////////


Roof.createContainer = function (def) {
  //TODO 订阅数据
  var cursorsForGlobal={}, cursorsForLocal={}
  for( var dataName in def.cursors){
    if( Roof.Node.isNodeInstance(def.cursors[dataName]) || Roof.Nodes.isNodesInstance(def.cursors[dataName])){
      cursorsForLocal[dataName] =def.cursors[dataName]
    }else{
      cursorsForGlobal[dataName] =def.cursors[dataName]
    }
  }

  //本地数据整合到一起，利用mixin
  var source= Roof.Data.subscribe(cursorsForGlobal)
  for( var dataName in cursorsForLocal){
    source[dataName] = cursorsForLocal[dataName]
  }

  //这个时候source里的数据不一定都准备好了
  var cursorMixin = new Mixin(source, {cursors: def.cursors, source:true})
  var sourceReadyMixin = new SourceReadyMixin(source)
  def.mixins = [cursorMixin, sourceReadyMixin].concat(def.mixins || [])

  //bus
  def.bus = Roof.bus


  var _render = def.render
  //TODO 重写render
  if (def.safeRender) {
    def.render = def.safeRender
  } else {
    def.render = function () {

      if (!source._isReady) {
        return source._error !== null ?
          (def.errorRender ?  def.errorRender.call(this) : 'error occurred when loading data')
          : null
      }else{
        return _render.call(this)
      }
    }
  }

  debugger
  return React.createClass(def)
}



