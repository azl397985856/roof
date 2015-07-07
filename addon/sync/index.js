var Roof = require('roof')

//重写 Node.createClass
var _originNodeCreateClass = Roof.Node.createClass
Roof.Node.createClass = function( def, options ){
  def = def || {}
  def = extend( def, generateSyncDef(options||{}) )
  return  _originNodeCreateClass.call( Roof.Node, def, options)
}

//重写 Nodes.createClass
var _originNodesCreateClass = Roof.Nodes.createClass
Roof.Nodes.createClass = function( def, options ){
  if( Roof.Node.isNodeClass( def ) ) def = {$factory : def}
  def = def || {}
  def = extend( def, generateSyncDef(options||{}) )
  return  _originNodesCreateClass.call( Roof.Nodes, def, options)
}


///////////////////

function generateSyncDef( options ){
  var def = {}
  var syncActions = loadSyncActions( [].concat(options.sync || options.middleware ))

  def.push = [generateSyncFns(syncActions.push),'unpushed','pushing','pushed']
  def.pull= [generateSyncFns(syncActions.pull),'unpulled','pulling','pulled']
  //用来标记和服务端的状态
  def.sync= ['synced','unsynced']
  return def
}

function loadSyncActions(middlewares) {
  var middlewareActions = {};
  var keys = ["before", "fn", "after"];
  middlewares.forEach(function (middleware) {

    forEach( middleware, function(  actionDef,actionName ){
      if (!middlewareActions[actionName]) {
        middlewareActions[actionName] = zipObject(keys, keys.map(function () {
          return [];
        }));
      }

      if (typeof actionDef === "function") {
        middlewareActions[actionName].fn.push(actionDef);
      } else if (isObject(actionDef)) {
        keys.forEach(function (key) {
          typeof actionDef[key] === "function" && middlewareActions[actionName][key].push(actionDef[key]);
        });
      } else {
        console.warn("unrecognized middleware action definition:", actionDef);
      }
    })
  });

  return middlewareActions;
}


function generateSyncFns( syncDef ){
  return function(){
    var that = this;
    var argv = Array.prototype.slice.call(arguments);
    var fnResult

    //改造fn
    if( syncDef.fn.length !== 1 ) console.warn('you have multiple sync main method')
    var _fns = syncDef.fn
    syncDef.fn = [function(){
      var result
      var _promise = promiseSeries(_fns, function(fn){
        return Promise.resolve(fn.apply(that, argv)).then(function(thisFnResult){
          if( !result ){
            result = thisFnResult
          }else{
            result = [].concat( result, thisFnResult)
          }
          return result
        })
      })

      _promise.then(function(){
        //同步成功
        that.states.activate('sync')
      })['catch'](function(e){
        console.warn('sync failed')
        console.error(e)
        that.states.deactivate('sync')
      })
      return _promise
    }]

    return promiseSeries(["before", "fn", "after"], function (fnName, lastRes) {
      if (!syncDef[fnName].length) {
        return lastRes;
      }
      var fns = syncDef[fnName];
      return promiseSeries(fns, function (fn) {
        //注意，实际上，只有 fn 传给 after 的 result 是有意义的
        return fn.apply(that, argv.concat(lastRes));
      }).then(function (_fnResult) {
        //保存 fn 执行的结果作为最后的结果
        if (fnName === "fn"){ fnResult = _fnResult }
        return _fnResult
      });

    }).then(function () {
      //返回fn的resolve值
      return fnResult;
    });
  }
}


function promiseSeries(fns, iterator) {
  var _promise = Promise.resolve(true);
  fns.forEach(function (fn) {
    _promise = _promise.then(function (data) {
      return iterator(fn, data);
    });
  });
  return _promise;
}

function extend( target, source){
  forEach( source, function( v, k){
    target[k] = v
  })
  return target
}

function isObject(obj) {
  return typeof obj === "object";
}

function zipObject(keys, values) {
  var output = {};
  for (var i in keys) {
    output[keys[i]] = values[i];
  }
  return output;
}

function forEach( obj, handler){
  for( var i in obj){
    if( obj.hasOwnProperty(i)){
      handler(obj[i],i)
    }
  }
}

