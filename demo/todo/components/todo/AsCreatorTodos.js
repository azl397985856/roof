require("./index.less")

var React = require("react")
var me = require("../../data/me")
var Item = require("./item")
var Input =  require("./input")


var tasksMixin = require("../../data")({
  cursors: {
    asCreatorTodos: "asCreatorTodos"
  }
})

module.exports = React.createClass({
  mixins: [tasksMixin],
  render: function () {
    var tasksNodes = this.cursors.asCreatorTodos.map(function (task) {
      var executor
      if(task.get("relations.ASSIGNED_TO.target") && task.get("relations.ASSIGNED_TO.target").id !== me.get("id") ){
        executor = task.get("relations.ASSIGNED_TO.target")
      }
      return <Item content={task.get("content")} executor={executor}/>
    })
    return (
      <div>
        <Input />
        <div className="todo-list-title">Created:</div>
        <div>
          {tasksNodes}
        </div>
      </div>
    )
  }
})