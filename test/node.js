var Nodes = require("../src/nodes")
var Node = require("../src/node")
var assert = require("assert")
var dct = require("../src/plugin/dct")

var userDef = require("./data/user")

describe("nodes basic test",function(){

  var remoteUser = new UserNode()

  remoteUser.pullOne({id:1})

  var userData = {}
  var anotherUserData = {}

  var user = new UserNode(userData)
  var anotherUser = new UserNode(anotherUserData)


  //build relation to another user
  user.relateTo( anotherUser ).as("friend",{
    knewSince:1988
  }).commit()

  //save changes to server
  //how to transfer data changes depend on `dct`
  user.push()

  //if push failed, should we rollback?
  user.rollback()

})