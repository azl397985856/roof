var Roof = require('roof')
var Node = Roof.Node
var Nodes = Roof.Nodes
var util = require('roof-node/lib/util')

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
  var newData = handler.call(this)
  var associates = Array.prototype.slice.call(arguments, 1)

  var isNodes =  util.isArray( newData) || Nodes.isNodesInstance( newData)
  if( !Node.isNodeInstance( newData) && !Nodes.isNodesInstance( newData)){
    var nodeClass = util.isArray( newData) ? Nodes.createClass() : Node.createClass()
    newData = new nodeClass(newData)
  }

  var that = this
  var updater = function () {
    var data = handler.call(that)
    newData.replace( isNodes ? data.toArray() : data.toObject())
  }

  //当关联集合内任何更新都触发新集合更新
  var originals = [this].concat(associates)


  originals.forEach(function (nodeOrNodes) {
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