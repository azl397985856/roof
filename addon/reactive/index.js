var Roof = require('roof')
var Node = Roof.Node
var Nodes = Roof.Nodes
var util = require('roof-node/compatible/util')

function after(obj, fnName, afterFn) {
  var _origin = obj[fnName]
  obj[fnName] = function () {
    var args = Array.prototype.slice.call(arguments)
    var res = _origin.apply(obj, args)
    res = afterFn.apply(obj, [res].concat(arguments))
    return res
  }
}


function transform(handler) {
  var handlerResult = handler.call(this)
  var associates = Array.prototype.slice.call(arguments, 1)
  var that = this
  //无论如何，都 return 一个 promise
  //外界的 roof 会解析我们的 promise 的
  return Promise.resolve(handlerResult).then(function( newData){

    var isNodes =  util.isArray( newData) || Nodes.isNodesInstance( newData)
    if( !Node.isNodeInstance( newData) && !Nodes.isNodesInstance( newData)){
      var nodeClass = util.isArray( newData) ? Nodes.createClass() : Node.createClass()
      newData = new nodeClass(newData)
    }
    //注意，这里的 newData 才是真正最后返回的数据对象

    var updater = function (val, oldVal, detail) {
      //修改数据的 api 都是 naive 的，触发的事件 detail 必然是 active
      //所以这里认为 detail state 为 active 才是修改了数据
      //除非用户指定了 transformOnAnyChange 为 true
      if( detail.state !== 'active' ){
        //console.log('detect change', detail)
        return
      }

      Promise.resolve(handler.call(that)).then(function( data ){
        //无论是 node 还是 nodes 都有 replace 方法，所以这里就好处理了
        newData.replace( isNodes ? data.toArray() : data.toObject())
      })['catch'](function(err){
        console.error('data transform failed')
        console.error(err)
      })
    }

    //当关联集合内任何更新都触发新集合更新
    var originals = [that].concat(associates)


    originals.forEach(function (nodeOrNodes) {
      //如果是集合，那么同时还要监听集合内每个的变化
      //因为 nodes 是不会把里面 node 的变化往上冒泡的
      if (Nodes.isNodesInstance(nodeOrNodes)) {
        nodeOrNodes.onAny('change', updater)
      }


      nodeOrNodes.on('change', updater)

      //处理销毁
      nodeOrNodes.on('destroyed', function () {
        newData.destroy()
        newData = null
      })
    })

    //处理新集合的销毁
    newData.on('destroyed', function () {
      Array.prototype.forEach.call([that].concat(associates), function (nodeOrNodes) {
        if (Nodes.isNodesInstance(nodeOrNodes)) {
          nodeOrNodes.offAny('change', updater)
        }
        nodeOrNodes.off('change', updater)
      })
      newData = null
    })

    return newData

  })
}


//Nodes
after(Nodes, 'createClass', function (newClass) {
  newClass.prototype.rxTransform = transform
  return newClass
})



//Node
after(Node, 'createClass', function (newClass) {
  newClass.prototype.rxTransform = transform
  return newClass
})