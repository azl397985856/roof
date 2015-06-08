function uuid(){
    return new Date().getTime().toString() + parseInt(Math.random() * 1000).toString()
}

function log(){
    console.info.apply(console, Array.prototype.slice.call(arguments))
}


function Channel() {
    var that = this
    this.listeners = {}
    this.connected = false
    this.acceptCode = null
    this.code= uuid()
    window.addEventListener("message", function (msg) {
        //只接受dev tool 来的消息
        log("message--->", msg, that.acceptCode )
        if (msg.source != window  || (msg.data.event !=="_contentScriptConnected" && msg.data.code !== that.acceptCode))  return;

        var data = msg.data
        log("get message " + data.event + " from", data.context.from)
        var event = data.event
        var args = data.args

        if (that.listeners[event]) {
            that.listeners[event].forEach(function (handler) {
                handler.apply(data, args)
            })
        }


    })

    //处理第一次content script 被注入的情况
    this.read("_contentScriptConnected", function(){
        log("content script connected", this.code)
        var msg = this
        that.connected = true
        //设置通信的code
        that.acceptCode = msg.code
        that.write("_pageScriptConnected", Object.keys( that.listeners))
    })
}

Channel.prototype.read = function (event, handler) {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(handler)
}

Channel.prototype.write = function (event) {
    if( !this.connected ) throw new Error("channel not connected")
    var args = Array.prototype.slice.call(arguments, 1)
    window.postMessage({event: event, args: args, code:this.code}, window.location.origin);
}

export default Channel