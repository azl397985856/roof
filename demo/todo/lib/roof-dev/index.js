import Channel from "./Channel.js"

function log(){
    console.info.apply(console, Array.prototype.slice.call(arguments))
}

function uuid(){
    return new Date().getTime().toString() + parseInt(Math.random() * 1000).toString()
}

export default function( Bus ){

    function Roof() {
        this.channel = new Channel()
        this.isDevToolOpened = false
        this.index = 0
        this.prefix = "roof_dev_tool_stack_"
    }

    Roof.prototype.insert = function (stack) {
        log("inserting", stack, this.isDevToolOpened)
        var key = this.prefix + this.index
        if (this.isDevToolOpened) {
            log("posting")
            this.channel.write("insert", key, stack)
        } else {
            log("local storage")
            localStorage.setItem(key, JSON.stringify(stack))
        }
        this.index++
    }

    Roof.prototype.reset = function () {
        localStorage.clear()
        this.index = 0
    }

    Roof.prototype.sync = function () {
        var stacks = []
        var key

        for (var i = 0; i < this.index; i++) {
            key = this.prefix + i
            stacks.push({key: key, value: JSON.parse(localStorage.getItem(key))})
        }

        log("sync data", stacks)
        this.channel.write("sync", stacks)
        //this.reset()
    }


    var roof = new Roof

    roof.channel.read("_popupOpened", function () {
        log("begin to sync====>")
        roof.sync()
        roof.isDevToolOpened = true
    })

    roof.channel.read("_popupClosed", function () {
        //清空localStorage，回到初始状态
        log("dev tool closed====>")
        roof.reset()
        roof.isDevToolOpened = false
    })


    var _fire = Bus.prototype.fire

    Bus.prototype.fire = function(...arg){
        var result =  _fire.call( this, ...arg )

        if( !this._isSnapshot ){
            result.then(()=>{
                console.log( this._runtime.stack)
                roof.insert( {indexName:"Global", $class:"listener",stack:this._runtime.stack} )
            },(err)=>{
                console.log("=====fire failed", err)
                roof.insert( {indexName:"Global", $class:"listener",stack:this._runtime.stack} )
            })
        }
        return result
    }

    return Bus
}