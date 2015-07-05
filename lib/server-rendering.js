'use strict'
var uuid = require("uuid")
var assign = require("object-assign")
module.exports = function( React){

    let ContextWrapper = React.createClass({
        displayName: 'ContextWrapper',
        childContextTypes: {
            roofServerRenderingKey: React.PropTypes.string.isRequired
        },

        getChildContext: function() {
            return {roofServerRenderingKey: this.props.roofServerRenderingKey};
        },

        render: function() {

            let def = this.props.def

            let pageProps = assign( {},def.container.props || {}, {
                entry : require(def.entry.path),
                entryName : def.entry.name,
                entryProps : {},
                context : def.context
            })
            let Page = require( def.container.path )
            return React.createElement(Page, pageProps);
        }
    });


    function setupRoofContext(key, appPath, context) {
        try {
            let dataModule = require(`${appPath}/data`);
            dataModule.isServerRendering = true;
            dataModule.setData(key, context);
        } catch (e) {
            console.log(e);
        }
    }

    function clearRoofContext(key, appPath) {
        try {
            let dataModule = require(`${appPath}/data`);
            dataModule.removeData(key);
        } catch (e) {
            console.log(e);
        }
    }

    function renderRoofApp( def ){
        var key = uuid.v4()
        setupRoofContext(key, def.path, def.context);


        let pageStr = React.renderToStaticMarkup(React.createElement(ContextWrapper, {
            roofServerRenderingKey : key,
            def:def
        }));
        clearRoofContext(key, def.path);
        return pageStr
    }

    return {
        renderRoofApp
    }
}


