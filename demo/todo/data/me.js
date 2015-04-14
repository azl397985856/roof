var Node = require("../../src/node")

var userDef = require("../../common/model/user")
var User = Node( userDef )
var me = User.new()


me.pull("me")

module.exports = me