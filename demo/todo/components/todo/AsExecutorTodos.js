var React = require("react")
var Item = require("./item")
require("./index.less")

var tasksMixin = require("../../data")({
  cursors: {
    asExecutorTodos: "asExecutorTodos"
  }
})

module.exports = React.createClass({
  mixins: [tasksMixin],
  render: function () {


    var tasksNodes = this.cursors.asExecutorTodos.map(function (task, index) {
      //console.log( task )
      return <Item key={index} content={task.get("content")} creator={task.get("relations.CREATE.target")}/>
    })
    return (
      <div className="todo-list">
        <div className="todo-list-title">Assigned to:</div>
        <div>
        {tasksNodes}
        </div>
      </div>
    )
  }
})