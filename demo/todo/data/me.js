var User = require("./type/user").Node
var me = User.new()

//TODO fetch mine identity from server
me.set({id:1,name:"jason"})

module.exports = me