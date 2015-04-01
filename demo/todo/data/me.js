var roof = require("roof")
var Node = roof.Node

var userDef = require("../../common/model/user")
var user = Node.derive(userDef)
var me = new User
me.fetch({"resource":"me"})

module.exports = me