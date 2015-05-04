var Bus = require("./bus")
var bus = new Bus

require("./todo")(bus)
require("./security")(bus)

bus.start()

module.exports = bus