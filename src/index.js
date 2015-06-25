import Bus from "roof-bus/lib/index.js"
import Node from "roof-node/lib/node"
import Nodes from "roof-node/lib/nodes"
import Util from "./util"

var Roof =  {Bus,Node,Nodes,Util}

if( !(typeof window == 'undefined' )) {
    window.Roof = Roof
}

export default Roof