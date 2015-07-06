'use strict';

var source = require('../data').source

module.exports = function(bus) {
  bus.on('todo.create', function createTodo( todo ) {
      source.todos.insert( todo.toObject())
  });

  bus.on("todo.remove", function removeTodo(todo){
    source.todos.remove({id : todo.get("id")})
  })
};
