

var Node = require("../../src/node")
var userDef = require("../../test/data/user")
var assert = require("assert")

//生成一个新的浏览器端对象类
var User = Node.derive(userDef)

/**
 * 示例 完整模型
 */

//生成一个代理对象
var clientUser = new User()
assert.equal( clientUser.is("client"), true )

//设置代理对象的值，这回将其变为脏代理
clientUser.set("age",5)
assert.equal( clientUser.is("dirty"), true )
assert.equal( clientUser.is("verified"), true )

//代理进行验证,这是一个异步方法
clientUser.verify().then(function verifySuccess(){
  assert.equal( clientUser.is("dirty"), true)
  assert.equal( clientUser.is("verified"), true )
  assert.equal( clientUser.is("error"), false )
}, function verifyFailed(){
  assert.equal( clientUser.is("dirty"), true )
  assert.equal( clientUser.is("verified"), true )
  assert.equal( clientUser.is("error"), true )
})


//代理 commit,可以给 commit 增加名字，回滚的时候可以指定某一个回滚。
var commitName="first commit"

//commit 有返回值，判断是否commit成功
if( clientUser.is("dirty") && clientUser.is("verified") &&  !clientUser.is("error")){

  assert.equal( clientUser.commit(commitName), true )

}else if( clientUser.is("dirty") && !clientUser.is("verified") ){

  assert.equal( clientUser.commit(commitName), true )

}else{

  assert.equal( clientUser.commit(commitName), false )
}

// commit 过的数据可以进行 push，与服务器端同步。这是一个异步方法。
clientUser.push().then(function pushSuccess(){
  assert.equal( clientUser.is("client"), false)
  assert.equal( clientUser.is("dirty"), false)
  assert.equal( clientUser.is("updated"), true)
  assert.equal( clientUser.is("verified"), true)
  assert.equal( clientUser.is("error"), false)
}, function pushFailed(){
  assert.equal( clientUser.is("client"), true)
  assert.equal( clientUser.is("dirty"), false)
  assert.equal( clientUser.is("updated"), false)
  assert.equal( clientUser.is("verified"), true)
  assert.equal( clientUser.is("error"), true)
})

/**
 * 示例 简化模型1
 * 将 commit 和 verify 结合
 */

var User1 = Node.derive(userDef)
User1.combine(["commit","verify"])

var user1 = new User1()

//得到一个已和服务器端同步数据
user1.fetch({id:1})

//其他api仍然一样
user1.set("age",22)
assert.equal( user1.is("dirty"), true )

//结合之后变成异步方法
user1.commit().then(function commitSuccess(){
  assert.equal( user1.is("dirty"), false )
  assert.equal( user1.is("verified"), true )
  assert.equal( user1.is("error"), false)
  assert.equal( user1.is("updated"), false)
}, function commitFailed(){
  //注意！commit 和 verify 整合后，如果验证失败，并不会 commit。
  assert.equal( user1.is("dirty"), true )
  assert.equal( user1.is("verified"), true )
  assert.equal( user1.is("error"), true )
  assert.equal( user1.is("updated"), false )
})


/**
 * 示例 简化模型2
 * 将 set 和 verify 结合
 */

var User2 = Node.derive(userDef)
User1.combine(["commit","verify"])

var user2 = new User2()

//得到一个已和服务器端同步数据
user2.fetch({id:1})

//合并后变成异步方法
user2.set("age",23).then(function setSuccess(){
  assert.equal( user2.is("dirty"), true )
  assert.equal( user2.is("verified"), true )
  assert.equal( user2.is("error"), false )
}, function setFailed(){
  assert.equal( user2.is("dirty"), true )
  assert.equal( user2.is("verified"), true )
  assert.equal( user2.is("error"), true )
})



/**
 * 示例 简化模型2
 * 将 set 和 verify 结合
 */

var user3 = Node.derive(userDef)
user3.combine(["commit","verify","set"])

var user3 = new user3()

//得到一个已和服务器端同步数据
user3.fetch({id:1})

//合并后变成异步方法
user3.set("age",23).then(function setSuccess(){
  assert.equal( user3.is("dirty"), false)
  assert.equal( user3.is("verified"), true )
  assert.equal( user3.is("error"), false )
}, function setFailed(){
  assert.equal( user3.is("dirty"), true )
  assert.equal( user3.is("verified"), true )
  assert.equal( user3.is("error"), true )
})


