'use strict';
let assign = require('object-assign');
let RoofMixin = require('./mixin/react.js');

function mapValues( obj, handler ){
    let output = {}
    for( let i in obj ){
        output[i] = handler(obj[i], i)
    }
    return output
}

module.exports = function( dataModules ){

    let exportsObj = function (mixinDef) {
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
