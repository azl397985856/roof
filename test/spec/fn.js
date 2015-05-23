var assert = require("assert")
describe("function instance",function(){

  function generateFn(){
    return function(){}
  }

  var a = generateFn()
  var b = generateFn()
  it("not equal", function(){
    assert.notEqual( a, b)
  })

})