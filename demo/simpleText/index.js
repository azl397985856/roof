/**
 * Created by jiamiu on 15-4-27.
 */
var React = require("react")
var SimpleText = require("./components/SimpleText.js")


var container = document.createElement("div")
document.body.appendChild(container)
React.render(<SimpleText />, container)

