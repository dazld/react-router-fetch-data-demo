var React = require('react');
var Router = require('react-router');

var City = React.createClass({
    mixins: [Router.State],
    getInitialState: function(){
        var params = this.getParams();
        console.log(this.props)
        return {
            data: this.props.data.locations.get(params.locationId)
        };
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

module.exports = City;
