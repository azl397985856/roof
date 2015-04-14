var React = require("react")
var data = require("../data")

var Index = React.createClass({
  getInitialState(){
    return {
      todo : this.props.todo
    }
  },
  remove(){
    this.state.todo.destroy().push()
  },
  complete(){
    var todo = this.state.todo
    todo.set("complete",true)
    todo.commit().push()
  },
  render : function() {
    return (
      <div>
        <span>{this.state.todo.get("content")}</span>
        <a onClick={this.remove}>remove</a>
        <a onClick={this.complete}>complete</a>
      </div>
    )
  }
})

module.exports = Index