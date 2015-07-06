'use strict';
var Nodes = require('roof').Nodes;
var TodoList = Nodes.createClass();

module.exports = function( global ) {

  //浏览器端 global === window
  //在服务器端渲染时 global 是由服务器端传入的对象

  var originData = [
    {
      id: 0,
      content : "music"
    },
    {
      id: 1,
      content :"sports"
    },
    {
      id: 2,
      content : "reading"
    }
];

  return new TodoList(originData);
};


/*
(1)  如果当前数据的加载是异步的，那么请返回一个标准的promise。promise 的结果将作为数据实例。例如：

 'use strict';
 var Nodes = require('roof').Nodes;
 var TodoList = Nodes.createClass();

 module.exports = function(global) {

     return new Promise(function( resolve, reject){
         jQuery.get('/myTodos').then(function(data){
             resolve(new TodoList(data))
         })
     })

 };


(2) 如果当前数据的加载依赖于其他数据，那么请用以下写法：

 'use strict';
 let Nodes = require('roof').Nodes;
 let CreatorList = Nodes.createClass();

 module.exports = {
 //在init 函数中可以一次获得依赖数据
     init : function(global, asCreatorTodos) {

         var creators = []
         asCreatorTodos.forEach(function(todo){
            if( todo.get('creator') && creators.indexOf(todo.get('creator.name')) === -1){
                creators.push( todo.get('creator'))
            }
        })
        return new CreatorList(creators)

    },
    waitFor : ['asCreatorTodos']
 }
 */
