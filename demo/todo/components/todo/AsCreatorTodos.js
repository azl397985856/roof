var React = require("react")
var tasksMixin = require("../../data")({
  cursors: {
    asCreatorTodos: "asCreatorTodos"
  }
})

module.exports = React.createClass({
  mixins: [tasksMixin],
  render: function () {
    var tasksNodes = this.cursors.asCreatorTodos.map(function (task) {
      return <li>{task.get("content")}</li>
    })
    return (<div>
      <div>I created:</div>
      <ul>
        {tasksNodes}
      </ul>
    </div>)
  }
})