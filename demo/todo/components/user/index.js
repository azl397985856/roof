var React = require("react")
//var Login = require("./login")
//var Info = require("./info")
require("./index.less")

var meMixin = require("../../data")({cursors:{
  me : "me"
}})


var Index = React.createClass({
  mixins : [meMixin],
  render : function(){
    if( this.cursors.me.get("id") ){
      return (<div className="user-info">Hello , {this.cursors.me.get("name")}</div>)
    }else{
      return (<div>please login</div>)
    }
  }
})

module.exports = Index