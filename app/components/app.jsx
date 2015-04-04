var Promise = require('bluebird');
var React = require('react');
var Router = require('react-router');

var _ = require('lodash');

var Link = Router.Link;
var Promise = require('bluebird');

var App = React.createClass({
    statics: {
        fetchData: function(){
            // tell store what we need
            return Promise.resolve(true);
        },
        // willTransitionTo: function(){
            // check user object for validity?
        // }
    },
    componentDidMount: function(){
        // this.props.data.searchResults.on('all', this.setState);
        this.check = Date.now();
        this.doSearch = _.debounce(this.doSearch, 1000);
    },
    componentDidUnmount: function(){
        // this.props.data.locations.off('all', this.setState);
    },
    componentWillReceiveProps: function(){
        // this.props.data.locations.once('sync', this.forceUpdate)
    },
    getInitialState: function(){
        // get data from store
        return {
            search: this.props.search || ''
        };
    },
    handleInput: function(event){
        console.log(this.check)
        this.setState({
            search: event.target.value.substr(0, 140)
        }, this.doSearch);
    },
    doSearch: function(){
        console.log(this.check)
        this.props.data.searchResults.setSearchTerm(this.state.search);
        this.props.data.searchResults.fetch().then(this.forceUpdate.bind(this));
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
