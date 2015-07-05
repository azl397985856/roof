'use strict';

var RoofMixin = require('../addon/react/mixin/react.js');

function assign( target, source){
    for( var i in source){
        if( source.hasOwnProperty(i)){
            target[i] = source[i]
        }
    }
    return target
}

function mapValues( obj, handler ){
    var output = {}
    for( var i in obj ){
        output[i] = handler(obj[i], i)
    }
    return output
}

module.exports = function( dataModules ){

    var exportsObj = function (mixinDef) {
        if (!exportsObj.isServerRendering) {
            if (Object.keys(exportsObj.source).length === 0) {
                assign(exportsObj.source, mapValues(dataModules, function(dataModule) {
                    return dataModule({context: context});
                }));
            }
        }else {
            // 占位符
            exportsObj.source = {};
        }

        return new RoofMixin(exportsObj.isServerRendering ? exportsObj : exportsObj.source, mixinDef);
    }

    // for server rendering
    exportsObj._serverRenderingData = {};
    exportsObj.isServerRendering = false;

    exportsObj.setData = function(key, context) {
        exportsObj._serverRenderingData[key] = mapValues(dataModules, function(dataModule) {
            return dataModule({context: context});
        });
    };

    exportsObj.getData = function(key) {
        return exportsObj._serverRenderingData[key];
    };

    exportsObj.removeData = function(key) {
        delete exportsObj._serverRenderingData[key];
    };

//  占位符
    exportsObj.source = {};

    return exportsObj
}
