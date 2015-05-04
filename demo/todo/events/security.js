module.exports = function(bus){

  bus.module("security")
  bus.on("todo.create", {
    "function" : function guide( todo ){
      if( /drug/.test( todo.get("content"))){
        return this.error("你这有敏感词啊！")
      }
    },
    first : true
  })
}