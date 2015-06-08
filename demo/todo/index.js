/**
 * Created by jiamiu on 15-4-27.
 */

require("../../node_modules/babel/polyfill.js")
var React = require("react")
var Index = require("./components/index.js")

var container = document.createElement("div")
document.body.appendChild(container)
Index( container )
