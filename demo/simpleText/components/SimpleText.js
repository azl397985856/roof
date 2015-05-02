var React = require("react")
var RoofMixin = require("../../../src/mixin/react.js")
var data = require("../data")

var roofMinxin = new RoofMixin(data, {
  cursors: {
    user: "user"
  }
})

module.exports = React.createClass({
  mixins: [roofMinxin],
  getInitialState: function () {
    return {
      formData: {}
    }
  },
  handleFormChange: function (field, e) {
    var formData = this.state.formData
    formData[field] = e.target.value
    this.setState({formData: formData})
  },
  asyncFormData: function () {
    this.cursors.user.set(this.state.formData)
  },
  printData: function () {
    this.setState({data: JSON.stringify(this.cursors.user.toObject())})
  },
  render: function () {
    return (
      <div>
        <h1>Definition</h1>
        <pre>
        {JSON.stringify({
          user : {
            name:"jhon"
          }
        })}
        </pre>
        <hr />

        <h1>Automatically change</h1>
        <div>
          <input type="text" value={this.cursors.user.get("name")} onChange={this.cursors._handleFormChange.bind(this, this.cursors.user, "name")}/>
        </div>
        <div>{this.cursors.user.get("name")}</div>

        <hr />
        <h1>Mannually change</h1>
        <div>
          <input type="text" value={this.state.formData.name} onChange={this.handleFormChange.bind(this, "name")} />
        </div>
        <div>
          <button onClick={this.asyncFormData}>async data</button>
        </div>
        <div>{this.cursors.user.get("name")}</div>
        <hr/>

        <h1>Data states</h1>

        <table>
          <tr>
            <td>isClean</td>
            <td>{this.cursors.user.is("clean").toString()}</td>
          </tr>
          <tr>
            <td>isDirty</td>
            <td>{this.cursors.user.is("dirty").toString()}</td>
          </tr>
          <tr>
            <td>isUnset</td>
            <td>{this.cursors.user.is("unset").toString()}</td>
          </tr>
          <tr>
            <td>isSetting</td>
            <td>{this.cursors.user.is("setting").toString()}</td>
          </tr>
          <tr>
            <td>isSet</td>
            <td>{this.cursors.user.is("set").toString()}</td>
          </tr>
        </table>

        <hr />

        <h1>Print</h1>
        <button onClick={this.printData}>print data</button>
        <div>{this.state.data}</div>
      </div>
    )
  }
})