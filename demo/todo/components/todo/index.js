var React = require("react")

var List = require("./list")
var Input= require("./input")

var data = require("../../data")


var Index = React.createClass({
  data : {
    todos : ['todos']
  },
  render() {
    return (
      <div>
        <Input />
        <List data = {this.data.todos.get()}/>
      </div>
    )
  }
})

module.exports = Index