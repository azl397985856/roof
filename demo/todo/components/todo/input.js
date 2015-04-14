var React = require("react")

var data = require("../../data")


var Index = React.createClass({
  mixins : [data.mixin],
  getInitialState : function(){
    return {
      todo : this.cursors.todos.new()
    }
  },
  cursors : {
    todos : ['todos']
  },
  onKeyUp : function(e){
    var todo = this.state.todo
    if( e.keyCode === 13 ){
      todo.verify().then(()=>{
        todo.commit().push().then(function(){
          this.cursors.todos.insert( todo )
          this.setState({todo:this.cursors.todos.new()})
        })
      })
    }
  },
  render() {
    var todo = this.state.todo
    var error = todo.is("error") ? (<div>{todo.getError().message}</div>) : null
    return (
      <div>
        <input disabled={todo.is("verifying")||todo.is("pushing")} type="text" value={todo.get("content")} onChange={this.set.bind(this,todo,"content")} onKeyUp={this.onKeyUp}/>
        <div>{error}</div>
      </div>
    )
  }
})

module.exports = Index