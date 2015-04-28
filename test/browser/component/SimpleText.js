var React = require("react")
var RoofMixin = require("../../../src/mixin/react.js")
var data = require("../data")

var roofMinxin = new RoofMixin(data,{
  cursors : {
    user : "user"
  }
})

module.exports =  React.createClass({
  minxins : [roofMinxin],
  render : function(){
    return (<div>{this.cursors.user.get("name")}</div>)
  }
})