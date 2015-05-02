var Group = require("./type/group").Nodes
var me = require("./me")

var groups = Group.new([])

if( me.get("id") ){
  //TODO fetch from server
}



module.exports = groups