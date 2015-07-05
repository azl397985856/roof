module.exports = function( obj, namespace ){
  var cursor = obj
  var path = namespace.split('.')
  var current
  while( current = path.shift() ){
    if( cursor[current] === undefined ){
      cursor[current] = {}
    }
    cursor = cursor[current]
  }
}