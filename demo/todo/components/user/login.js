var React = require("react")
var data = require("../data")

var Index = React.createClass({
  mixins : [data.mixin],
  cursors : {
    me : ['me']
  },
  onRegister : function(){
    var me = this.cursors.me
    me.verify().then(()=>{
      me.commit()
      me.push()
    })
  },
  onLogin : function(){
    this.cursors.me.pull({
      name : this.refs.getDomNode().name.value,
      password : this.refs.getDomNode().password.value
    })
  },
  render : function(){
    var me = this.cursors.me
    var error = me.is("error") ? (<div>{me.getError().message}</div>) : null

    return (
      <div>
        <div>
          <h2>register</h2>
          <input type="text" placeholder="user name" value={me.get("name")} onChange={this.set.bind(this,me,"name")}/>
          <input type="password" placeholder="password" value={me.get("password")} onChange={this.set.bind(this,me,"password")} />
          <button onClick={this.onRegister}>register</button>
        </div>
        <div>
          <h2>login</h2>
          <input type="text" placeholder="user name" ref="name"/>
          <input type="password" placeholder="password" ref="password" />
          <button onClick={this.onLogin}>login</button>
        </div>
        {error}
      </div>
    )
  }
})

module.exports = Index