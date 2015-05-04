var React = require("react")
require("./index.less")

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute



var Todo = require("./todo")
var Sidebar = require("./sidebar")


var AsCreatorTodos = require("./todo/AsCreatorTodos.js")
var AsExecutorTodos = require("./todo/AsExecutorTodos.js")
var Groups = require("./group/groups")


var Index = React.createClass({
  render : function(){
    return (
      <div>
        <div className="layout-sidebar">
          <Sidebar />
        </div>
        <div className="layout-content">
          <RouteHandler/>
        </div>
      </div>
    )
  }
})


// declare our routes and their hierarchy
var routes = (
  <Route handler={Index}>
    <DefaultRoute handler={AsExecutorTodos}/>
    <Route path="as-creator-todos" handler={AsCreatorTodos} />
    <Route path="as-executor-todos" handler={AsExecutorTodos} />
    <Route path="groups" handler={Groups} />
  </Route>
);

module.exports = function( container ){
  Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, container );
  });
}