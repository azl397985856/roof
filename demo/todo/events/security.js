module.exports = function(bus){

  bus.on("todo.create", {
    "fn" : function guide( todo ){
      if( /drug/.test( todo.get("content"))){
        return this.error("你这有敏感词啊！")
      }
    },
    first : true
  })
}