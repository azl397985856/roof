"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _roofBusLibIndexJs = require("roof-bus/lib/index.js");

var _roofBusLibIndexJs2 = _interopRequireDefault(_roofBusLibIndexJs);

var _roofNodeLibNode = require("roof-node/lib/node");

var _roofNodeLibNode2 = _interopRequireDefault(_roofNodeLibNode);

var _roofNodeLibNodes = require("roof-node/lib/nodes");

var _roofNodeLibNodes2 = _interopRequireDefault(_roofNodeLibNodes);

var Roof = { Bus: _roofBusLibIndexJs2["default"], Node: _roofNodeLibNode2["default"], Nodes: _roofNodeLibNodes2["default"] };

if (!(typeof window == "undefined")) {
    window.Roof = Roof;
}

exports["default"] = Roof;
module.exports = exports["default"];