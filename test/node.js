var assert = require("assert")
var _ = require("lodash")
var Node = require("../src/node")
var defaultMiddleWare = require("./middleware/default")

var userDef = require("./data/user")
var User = Node( userDef, {middleware:defaultMiddleWare} )


describe("initial states test",function(){
  var john = User.new()
  it("initial state should match",function(){

    assert.equal( john.is("unpulled"), true )
    assert.equal( john.is("pulled"), false )
    assert.equal( john.is("unpushed"), true )
    assert.equal( john.is("pushed"), false )
    assert.equal( john.is("unset"), true )
    assert.equal( john.is("set"), false )
    assert.equal( john.is("uncommitted"), true )
    assert.equal( john.is("committed"), false )
    assert.equal( john.is("unverified"), true )
    assert.equal( john.is("verified"), false )
    assert.equal( john.is("unrollbacked"), true )
    assert.equal( john.is("rollbacked"), false )

  })

  it("state combo should match", function(){
    assert.equal( john.is("unpulled","unpushed"), true )
    assert.equal( john.is("unpulled","pushed"), false )
    assert.equal( john.is(["unset","uncommited"]), true )
    assert.equal( john.is(["unset","pushed"]), true )
    assert.equal( john.is(["set","pushed"]), false )
    assert.equal( john.is(["set","pushed"],"committed"), false )
    assert.equal( john.is(["unset","unpushed"],"committed"), false )
    assert.equal( john.is(["unset","unpushed"],"uncommitted"), true )
    assert.equal( john.is(["unset","pushed"],"uncommitted"), true )
  })
})

describe("data set test", function(){
  var jason = User.new()
  var props = {
    name : "jason",
    age : 25
  }

  _.forEach( props, function(v, k){
    jason.set(k,v)
  })

  it("set state should change", function(){
    assert.equal( jason.is("set"), true )
  })

  it("data should change", function(){
    _.forEach( props, function(v, k){
      assert.equal( jason.get(k), v)
    })
  })
})

describe("commit and rollback test", function(){
  var walker = User.new()
  var commitName = "first_commit"
  var props = {
    name : "walker",
    age : 32
  }

  _.forEach( props, function(v, k){
    walker.set(k,v)
  })

  it("data length should change", function(){
    walker.commit(commitName)
    assert.equal( walker.data.length, 1 )
    assert.equal( walker.is("committed"), true )
    assert.equal( walker.is("unset"), true )
  })

  it("data should change", function(){
    walker.set("age",26)
    assert.equal( walker.get("age"), 26 )
    assert.equal( walker.is("unset"), false )
    walker.rollback(commitName)
    assert.equal( walker.data.length, 0)
    assert.equal( walker.get("age"), 32)
    assert.equal( walker.is("unset"), true)
  })
})


describe("async state test", function(){
  it('async method should have async state', function( done ){
    var disel = User.new()
    var props = {
      name : "disel",
      age : 32
    }

    _.forEach( props, function(v, k){
      disel.set(k,v)
    })

    assert.equal( disel.is("unpushed"), true )
    disel.commit()
    assert.equal( disel.is("committed"), true )
    disel.push().then(function(){
      console.log( arguments)
      assert.notEqual( disel.get("id"), undefined )
      assert.equal( disel.is("pushed"), true )
      assert.equal( disel.is("valid"), true )
      done()
    })

    assert.equal( disel.is("pushing"), true )
  })
})

describe("combine action test", function(){

  var lati = User.new()
  lati.combine(["set","commit"])

  it("set and commit state should change together", function( done ){
    assert.equal( lati.is("unset","uncommitted"), true)
    lati.set("name","lati").then(function(){
      assert.equal( lati.is("unset","committed"), true)
      done()
    })
  })

  var rome = User.new()
  rome.combine(['push','commit'])

  it("auto commit after push", function( done){
    rome.set("name","rome")
    assert.equal( rome.is("unpushed","uncommitted"), true)
    rome.push().then(function(){
      assert.equal( rome.is("pushed","committed"), true)
      assert.notEqual( rome.get("id"), undefined)
      done()
    })
  })
})


describe("state event test", function(){

})

describe("push wrong data should change local object state to error",function(){

})