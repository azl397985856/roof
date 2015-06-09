var React = require("react")
var Todo = require("../../common/type/todo").Node
var Mixin = require("roof-node/mixin/react.js")
var Util = Mixin.util
var bus = require("../../events")
require("./input.less")

var newTodo = new Todo()
var todoMixin = new Mixin({todo:newTodo},{cursors:{"todo":"todo"}})

var Index = React.createClass({
  mixins : [todoMixin],
  onKeyUp : function(e){
    var todo = this.cursors.todo
    if( e.keyCode === 13 ){
      bus.fire("todo.create", todo ).then(function(){
        todo.set("content","")
      },function(res){
        alert("创建失败:"+res.data)
      })
    }
  },
  render() {
    var todo = this.cursors.todo

    return (
      <div>
        <input disabled={todo.is("verifying")||todo.is("pushing")} type="text" value={todo.get("content")} onChange={Util.handleFormChange.bind(this,todo,"content")} onKeyUp={this.onKeyUp}/>
        <div></div>
      </div>
    )
  }
})

module.exports = Index