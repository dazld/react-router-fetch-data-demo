"use strict";

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
        var data = this.props.data.locations.get(params.locationId);
        return {
            data: data,
            windDirection: data.wind.deg
        };
    },
    componentDidMount: function(){

        var update = function(){
            this.setState({
                windDirection: this.state.data.wind.deg + (-5 + Math.random() * 10)
            });
            this.timeout = setTimeout(update, Math.random() * 3000)
        }.bind(this);

        update();
        
    },
    componentWillUnmount: function(){
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    },
    componentWillReceiveProps: function(){
        this.setState(this.getInitialState()); // @fixme
    },
    render: function() {
        var data = this.state.data;



        var arrowStyle = {
            transform: 'rotate('+this.state.windDirection+'deg)'
        };

        return (
            <div className="location">
                <h1>{ data.name }</h1>
                <div className="temps">
                    <span className="min"><strong>{ data.temp_min }</strong>&deg;c /</span>
                    <span className="now"><strong>{ data.temp }</strong>&deg;c /</span>
                    <span className="max"><strong>{ data.temp_max }</strong>&deg;c</span>
                </div>
                <div className="suntimes">
                    <div className="rise">Sunrise: {  }</div>
                    <div className="set">Sunset: {  }</div>
                </div>
                <div className="wind">
                    <div className="arrow" style={arrowStyle}></div>
                    <div className="speed">Wind speed: {data.wind.speed}km/h</div>
                </div>
            </div>
        );
    }

});

module.exports = Location;
