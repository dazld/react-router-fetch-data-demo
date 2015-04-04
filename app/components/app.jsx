"use strict";
var Promise = require('bluebird');
var React = require('react');
var Router = require('react-router');

var _ = require('lodash');

var Link = Router.Link;

var App = React.createClass({
    statics: {
        fetchData: function(){
            // tell store what we need
            return Promise.resolve(true);
        }
    },
    componentDidMount: function(){
        this.doSearch = _.debounce(this.doSearch, 1000);
    },

    getInitialState: function(){
        return {
            search: this.props.search || '',
            loading: false
        };
    },
    handleInput: function(event){
        this.setState({
            search: event.target.value.substr(0, 140),
            loading: true
        }, this.doSearch);
    },
    doSearch: function(){
        this.props.data.searchResults.setSearchTerm(this.state.search);
        this.props.data.searchResults.fetch().finally(function(){
            this.setState({
                loading: false
            });
        }.bind(this)); // @fixme
    },
    getLinks: function(){
        return [{
            name: 'Berlin',
            id: '2950159'
        },{
            name: 'London',
            id: '2643743'
        }].map(function(item){

            var params = {
                locationId:item.id
            };

            return (<Link params={params} to="location">{item.name}</Link>);
        });
    },
    render: function() {
        var results;
        if (this.props.data.searchResults.length) {
            results = this.props.data.searchResults.map(function(result){
                return (
                    <div className="result">
                        <Link to='location' params={{
                            locationId: result.id
                        }}>{result.name + ', ' + result.sys.country}</Link>
                    </div>
                )
            });
        }

        return (
            <div>
                {this.getLinks()}
                <input type="text" value={this.state.search} onChange={this.handleInput} />
                {results}
                <Router.RouteHandler data={this.props.data} />
            </div>
        );
    }

});

module.exports = App;
