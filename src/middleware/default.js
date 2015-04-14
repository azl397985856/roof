var Promise = require("bluebird")

module.exports = {
  push : {
    fn : function fakePush(){
      var that = this
      if( that.is("committed") ) {
        console.warn("you are trying to push a uncommitted data")
      }

      var data = that.toPlainObject()
      data.id = 1
      return new Promise(function( resolve ){
        setTimeout(function(){
          that.replace( data )
          resolve(data)
        },100)
      })
    }
  },
  pull : function(){

  }
}