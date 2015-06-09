
//TODO webpack打包失效， 返回空对象
var Bus = require("../lib/roof-dev")( require( "roof-bus/lib/index.js") )
var modules =require("./modules.js")

var bus = new Bus

modules.forEach(function( moduleName){
    bus._module.set(moduleName)
    require("./"+moduleName)(bus)
})


module.exports = bus