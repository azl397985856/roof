/**
 * Created by jiamiu on 15-4-12.
 */
  var _ = require("lodash")
var NodeActionTense = {
  'push':['unpushed','pushing','pushed'],
  'pull':['unpulled','pulling','pulled'],
  'set':['unset','setting','set'],
  'verify':['unverified','verifying','verified'],
  'commit':['uncommitted','committing','committed'],
  'rollback':['unrollbacked','rollbacking','rollbacked']
}

var NodeActionTenseMap = _.transform( NodeActionTense, function( result,v,k){
  var m={
    0:"initial",
    1:"started",
    2:"ended"
  }
  v.forEach(function( state,i ){
    result[state] = [k, m[i]]
  })
})

console.log( NodeActionTenseMap)