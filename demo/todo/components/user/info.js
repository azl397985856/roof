var React = require("react")
var data = require("../data")

var Index = React.createClass({
  mixins : [data.mixin],
  cursors : {
    me : ['me']
  },
  render : function() {
    return (
      <div>
        <div>name : {this.cursors.me.get("name")}</div>
      </div>
    )
  }
})

module.exports = Index