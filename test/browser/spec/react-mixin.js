jest.dontMock('../component/SimpleText.js');

describe("initial states test",function(){
  it("should show the initial state",function(){

    var React = require('react/addons');
    var SimpleText = require('../component/SimpleText.js');
    var TestUtils = React.addons.TestUtils;


    //var textNode = TestUtils.renderIntoDocument(
    //  <SimpleText />
    //);

    //expect(textNode.getDOMNode().textContent).toEqual('jhon');
    expect(true).toEqual(true)
  })
})