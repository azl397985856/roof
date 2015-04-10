

var Nodes = require("../../src/nodes")
var userDef = require("../../test/data/user")
var assert = require("assert")

//生成一个新的浏览器端对象集合类
var UserNodes = Nodes.derive(userDef)

//use UserNodes basic methods
UserNodes.insert({age:"5"}).then(function(){})
UserNodes.update({}).then(function(){})
UserNodes.remove({age:">5"}).then(function(){})
UserNodes.pull({age:">5"}).then(function(){})


//get a collection instance of nodes
var users = new UserNodes()

//fetch data from server
users.pull({limit:100})

//basic method to operate the data
//these basic method will return a promise which holds the result of validation
users.insert({name:"A",age:16})
users.remove({name:"B"})
users.update({name:"C"},{age:1000})

//commit changes
//if validation not passed, we will warn you but not stop you.
//if validation promise not finished, commit will wait.
//commit will return a promise too.
users.commit()

//save changes to server
//how to transfer data changes depend on `dct`
//if push failed, the collection will be marked as dirty.
users.push()

//if push failed, should we rollback?
users.rollback()


//get a single
users.findOne(1)

//get a sub collection
users.find({name:"A"})

//custom filter
users.find(function(obj){
  return obj.name === "A"
})


