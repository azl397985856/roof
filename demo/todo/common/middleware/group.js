
module.exports = {
  Nodes: {
    pull:  {
      fn : function fakePull() {
        var that = this

        var data = [
          {id:1,content:"fake task1",creator : {id:1,name:'jason'}}
        ]

        return new Promise(function (resolve) {
          setTimeout(function () {
            that.fill(data)
            resolve(data)
          }, 4000)
        })
      }
    }
  }
}