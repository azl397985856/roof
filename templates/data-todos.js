'use strict';
let Nodes = require('roof').Nodes;
let TodoList = Nodes.createClass();

module.exports = function( global ) {

  //浏览器端 global === window
  //在服务器端渲染时 global 是由服务器端传入的对象

  let originData = [
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

