var Promise = require('bluebird');
var React = require('react');
var Router = require('react-router');



var App = React.createClass({
    statics: {
        fetchData: function(){
            // tell store what we need
        }
    },
    getInitialState: function(){
        // get data from store
        return {
            search: this.props.search || ''
        };
    },
    handleInput: function(event){
        this.setState({
            search: event.target.value.substr(0, 140)
        });
    },
    render: function() {

        var pars = {
            locationId: 2950159
        }
        return (
            <div>
                <Router.Link to="location" params={pars}>thing</Router.Link>
                <input type="text" value={this.state.search} onChange={this.handleInput} />
                <Router.RouteHandler data={this.props.data} />

            </div>
        );
    }

});

module.exports = App;
