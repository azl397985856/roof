var React = require("react")
require("./item.less")

var Index = React.createClass({
  render() {
    var creatorNode = null;
    var executorNode = null;

    if( this.props.creator ){
      creatorNode = (<span className="todo-item-creator-name">by {this.props.creator.name}</span>)
    }

    if( this.props.executor ){
      executorNode = (<span className="todo-item-executor-name">to {this.props.executor.name}</span>)
    }

    return (
      <div className="todo-item">
        <span className="todo-item-content-prefix"></span>
        <span className="todo-item-content">
        {this.props.content}
        </span>
        {creatorNode}
        {executorNode}
      </div>
    )
  }
})

module.exports = Index