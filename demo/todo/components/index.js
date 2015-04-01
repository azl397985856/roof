var React = require("react")

var User = require("./user")
var Todo = require("./todo")

var Index = React.createClass({
  data : {
    me : ["me"]
  },
  render : function(){
    (
      <div>
        <User />
        <Todo />
      </div>
    )
  }
})

module.exports = Index