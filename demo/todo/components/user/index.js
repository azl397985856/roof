var React = require("react")
var Login = require("./login")
var Info = require("./info")

var data = require("../data")

var Index = React.createClass({
  mixins : [data.mixin],
  cursors : {
    me : ['me']
  },
  render : function(){
    if( this.cursors.me.get("id") ){
      return (<Login />)
    }else{
      return (<Info />)
    }
  }
})

module.exports = Index