var Promise = require('bluebird');
var React = require('react');
var Router = require('react-router');

var Link = Router.Link;


var App = React.createClass({
    statics: {
        fetchData: function(){
            // tell store what we need
        }
    },
    componentDidMount: function(){
        this.props.data.locations.on('sync', this.forceUpdate);
    },
    componentDidUnmount: function(){
        this.props.data.locations.off('sync', this.forceUpdate);
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
    getLinks: function(){
        return [{
            name: 'Berlin',
            id: '2950159'
        },{
            name: 'London',
            id: '6058560'
        }].map(function(item){
 
            var params = {
                locationId:item.id
            };

            return (<Link params={params} to="location">{item.name}</Link>)
        })
    },
    render: function() {

        
        return (
            <div>
                {this.getLinks()}
                <input type="text" value={this.state.search} onChange={this.handleInput} />
                <Router.RouteHandler data={this.props.data} />
            </div>
        );
    }

});

module.exports = App;
