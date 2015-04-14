var States = require("../src/states")
var assert = require("assert")


var NodeActionTense = {
  'push':['unpushed','pushing','pushed'],
  'pull':['unpulled','pulling','pulled'],
  'set':['unset','setting','set'],
  'verify':['unverified','verifying','verified'],
  'commit':['uncommitted','committing','committed'],
  'rollback':['unrollbacked','rollbacking','rollbacked'],
  'replace' : ['unreplaced','replacing','replaced']
}

var NaiveStates = {
  "valid" : ["valid","invalid"]
}


describe("state test", function(){
  var states

  beforeEach(function(){
    states = new States({
      tenses:NodeActionTense,
      naive : NaiveStates
    })
  })

  it("basic action test",function(){
    states.start("push")
    assert.equal( states.is("pushing"), true )
    assert.equal( states.is("pushed"), false )
    states.end("push")
    assert.equal( states.is("pushed"), true )
    assert.equal( states.is("pushing"), false )
  })

  it("basic naive state test", function(){
    states.activate("valid")
    assert.equal( states.is("valid"), true )
    states.deactivate("valid")
    assert.equal( states.is("invalid"), true )
  })

  it("combined state test", function(){
    states.activate("valid")
    states.start("push")
    assert.equal( states.is("valid","pushing"), true )
    assert.equal( states.is("valid","pushed"), false )
    assert.equal( states.is(["valid","pushed"]), true)
    assert.equal( states.is(["valid","pushed"],"committed"), false)
    assert.equal( states.is(["valid","pushed"],"pushing"), true)
  })
})