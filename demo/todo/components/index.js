var React = require("react")

var User = require("./user")
var Todo = require("./todo")
var Header = require("./header")
var Sidebar = require("./sidebar")
var Body= require("./body")

var Index = React.createClass({
  render : function(){
    (
      <div>
        <Header />
        <Sidebar />
        <Body />
      </div>
    )
  }
})

module.exports = Index