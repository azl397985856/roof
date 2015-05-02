var React = require("react")
var User = require("../user")


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
      <div>
        <User />
        <ul>
          <li>
            <a>分配给我的</a>
          </li>
          <li>
            <a>我创建的</a>
          </li>
        </ul>
        <ul>
          {groupNodes}
        </ul>
      </div>
    )
  }
})