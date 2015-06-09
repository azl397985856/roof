var User = require("../common/type/user").Node
var me = new User()

//TODO read user from sension
me.set({id:1,name:"jason"})

module.exports = me