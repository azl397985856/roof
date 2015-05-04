var User = require("./type/user").Node
var me = User.new()

//TODO read user from sension
me.set({id:1,name:"jason"})

module.exports = me