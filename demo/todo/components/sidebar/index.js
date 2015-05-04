var React = require("react")
var User = require("../user")
require("./index.less")

var myGroupsMixin = require("../../data")({cursors:{
  myGroups : "asCreatorGroups"
}})


module.exports = React.createClass({
  mixins : [myGroupsMixin],
  render : function(){
    //var groupNodes = this.cursors.myGroups.map(function( group ){
    //  return (<li><a>group.get("name")</a></li>)
    //})
    var groupNodes = (<div></div>)

    return (
      <div className="sidebar">
        <div className="sidebar-img">
          <img src="https://todo.zerojs.io/nine/images/logo.svg" />
        </div>
        <User />
        <ul>
          <li>
            <a href="#/as-executor-todos">分配给我的</a>
          </li>
          <li>
            <a href="#/as-creator-todos">我创建的</a>
          </li>
        </ul>
        <ul>
          {groupNodes}
        </ul>
      </div>
    )
  }
})