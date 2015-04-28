var Node = require("../../src/node")
var defaultMiddleWare = require("../middleware/default/node")
var userDef = require("../data/user")
var User = Node( userDef, {middleware:defaultMiddleWare} )

var exports = {
  user : User.new({name:"jhon"})
}

module.exports = exports