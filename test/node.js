var Nodes = require("../src/nodes")
var Node = require("../src/node")
var assert = require("assert")
var dct = require("../src/plugin/dct")

var userDef = require("./data/user")

describe("nodes basic test",function(){

  var remoteUser = new UserNode()

  remoteUser.pull({id:1})

  var userData = {id:2}
  var anotherUserData = {id:3}

  //use UserNode as facade by passing initial data to it
  var user = new UserNode(userData)
  var anotherUser = new UserNode(anotherUserData)


  //build relation to another user
  user.relateTo( anotherUser, { friend : {knewSice:1988}} ).commit()

  //save changes to server
  //how to transfer data changes depend on `dct`
  user.push()

  //if push failed, should we rollback?
  user.rollback()

})