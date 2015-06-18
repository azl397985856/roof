import Bus from "roof-bus"
import Node from "roof-node/lib/node"
import Nodes from "roof-node/lib/nodes"

var Roof =  {Bus,Node,Nodes}

if( !(typeof window == 'undefined' )) {
    window.Roof = Roof
}

export default Roof