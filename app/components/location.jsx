var React = require('react');
var Router = require('react-router');

var Location = React.createClass({
    mixins: [Router.State],
    statics: {
        fetchData: function(stores, params){
            return stores.locations.getOrFetch(params.locationId);
        }
    },
    getInitialState: function(){
        var params = this.getParams();
        // console.log(this.props)
        return {
            data: this.props.data.locations.get(params.locationId)
        };
    },
    componentWillReceiveProps: function(){
        this.setState(this.getInitialState());
    },
    render: function() {
        return (
            <div>
                <h1>{this.state.data.name}</h1>
                <Router.Link to='root'>home</Router.Link>
            </div>
        );
    }

});

module.exports = Location;
