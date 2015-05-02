var React = require("react")


var myGroupsMixin = require("../../data")({cursors:{
  myGroups : "asCreatorGroups"
}})


module.exports = React.createClass({
  mixins : [myGroupsMixin],
  render : function(){
    var groupNodes = this.cursors.myGroups.map(function( group ){
      return (<li><a>group.get("name")</a></li>)
    })

    return (
      <div>
        <ul>
          <li>
            <a>分配给我的</a>
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