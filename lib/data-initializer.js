'use strict';

var OrderedList = require('roof-bus/lib/orderedList.js')
var Event = require('events')
var util = require("util")
var Roof = require('roof')
require('../util/namespace')(Roof,'Data')

var exports

/*
 utilities
 */
function assign(target, source) {
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      target[i] = source[i]
    }
  }
  return target
}

function values(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key]
  })
}

function mapValues(obj, handler) {
  var output = {}
  for (var i in obj) {
    output[i] = handler(obj[i], i)
  }
  return output
}

function forEach(obj, handler) {
  for (var i in obj) {
    if( obj.hasOwnProperty(i)){
      handler(obj[i], i)
    }
  }
}

function map(obj, handler){
  var output = isArray(obj) ? [] : {}
  for( var i in obj ){
    if( obj.hasOwnProperty(i)){
      output[i] = handler(obj[i],i)
    }
  }
  return output
}

function isArray(obj){
  return Object.prototype.toString.call(obj) === '[object Array]'
}

function isPlainObject(obj) {
  return obj.constructor.name === 'Object'
}

function initSourceFromDataModules(dataModules) {
  var list = new OrderedList
  var source = {}
  forEach(dataModules, function (moduleDef, name) {
    var moduleDef = dataModules[name]
    var order = {}
    if (isPlainObject(moduleDef) && moduleDef.waitFor) {
      order.after = moduleDef.waitFor
    }
    list.insert(name, moduleDef, order)
  })

  var results = {}
  list.forEach(function (moduleDef, name) {
    console.info('initializing Roof data:', name)
    var result
    if (typeof moduleDef === 'function') {
      result = moduleDef(window)
      if (result instanceof Promise) {
        result.then(function (data) {
          source[name] = data
        })['catch'](function (err) {
          console.error("data module init failed", name, err)
        })
      } else {
        source[name] = result
      }
      results[name] = result

    } else {
      //一定是有waitFor 的对象
      results[name] = Promise.all( map(moduleDef.waitFor, function (waitForname) {
        return results[waitForname]
      })).then(function (dataValues) {
        console.info("data waitFor resolved", name, dataValues)
        return moduleDef.init.apply(null, [window].concat(dataValues))
      })
    }
  }, function(){})

  return [source, results]
}

/*
 class Source
 */
function SourceProxy(origin, promises, cursors) {
  var that = this

  forEach(cursors, function (dataName, cursorName) {
    if (that[dataName] !== undefined) {
      throw new Error('you used a reserved key name as your data module name: ' + dataName)
    }

    if (origin[dataName] !== undefined) {
      //数据已加载好
      that[cursorName] = origin[dataName]
    } else {
      //数据是异步的，还没加载好
      if( promises[dataName]=== undefined) throw new Error('You subscribed a undefined data :' + dataName)
      promises[dataName].then(function (value) {
        that[cursorName] = value
      })['catch'](function (err) {
        console.warn(dataName, 'init failed', err)
      })
    }
  })

  that._isReady = false
  that._error = null

  Promise.all(values(promises)).then(function () {
    that._isReady = true
    that.emit('ready')
    console.info('all data is ready for cursors', cursors)
  })['catch'](function (err) {
    console.warn('some error happned when initializing data')
    console.error(err)
    that._error = err
    that.emit('error', err)
  })

  Event.EventEmitter.call(this)
}

util.inherits(SourceProxy, Event.EventEmitter);


/*
 exports
 */
var initResult
exports = function (dataModules) {
  if (exports.source === undefined) {
    initResult = initSourceFromDataModules(dataModules)
    exports.source = initResult[0]
    Roof.Data.source = initResult[0]
  }
}


Roof.Data.subscribe = function (cursors) {
  return new SourceProxy(initResult[0], initResult[1], cursors)
}


module.exports = exports

