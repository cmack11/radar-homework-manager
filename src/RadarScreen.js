import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import Radar from './RadarComponent/Radar.js'
import { DateRangePicker } from 'react-dates';




class RadarScreen extends Component {

	constructor(props) {
		super();

		let state = {
			show:props.show,
			dates:{
				startDate:moment(),
				endDate:moment().add(7,'days')
			},
			datePicker:{
			},
			view:{
				x:props.view.x,
				y:props.view.y,
				width:props.view.width,
				height:props.view.height

			},
			radarView:{
				x:0,
				y:0,
				width:1,
				height:1,
				dotsView:{
					width:props.view.width,
					height:props.view.height
				},
				colors:props.view.colors
			}
		}

		this.state = state;
	}

	componentWillReceiveProps(nextProps){
		
    }

    componentDidMount() {
    	this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions.bind(this));
		this.startUpdateInterval();
    }

    componentWillUnmount() {
    	if(this.dateUpdateInterval)
    		clearInterval(this.dateUpdateInterval);
    }

    updateWindowDimensions() {
    	let e = document.getElementById('radar');
    	let yOffset = 0;

    	if(e) {
    		let rect = e.getBoundingClientRect();
    		yOffset = rect.top;
    	} 
		let state = this.state;
		state.view.width = window.innerWidth;
		state.view.height = window.innerHeight - yOffset;
		this.setRadarDimensions(state);
	}

	setRadarDimensions(state) {
		let rWidth = .9 * Math.min(state.view.width,state.view.height);
		state.radarView = {
			x:(state.view.width-rWidth) / 2,
			y:(state.view.height-rWidth) / 2,
			width:rWidth,
			height:rWidth,
			dotsView:{
				width:state.view.width,
				height:state.view.height
			},
			colors:state.radarView.colors
		}
		this.setState(state);
	}

	startUpdateInterval() {
		if(this.dateUpdateInterval) return;
		this.dateUpdateInterval = setInterval(() => {
			let difference = this.state.dates.endDate.valueOf() - this.state.dates.startDate.valueOf();
			let state = this.state;
			state.dates.startDate = moment();
			state.dates.endDate = moment(state.dates.startDate).add(difference,'ms')
			this.setState(state);
		},10000)
	}

	endUpdateInterval() {
		if(!this.dateUpdateInterval) return;
		clearInterval(this.dateUpdateInterval);
	}

	

	render() {
	if(!this.props.show) return null;

    return (
    	<div id= 'radarScreen' className='radar-screen'>
    		<DateRangePicker
    		  startDate={this.state.dates.startDate}
    		  startDateId="StartDate"
    		  endDate={this.state.dates.endDate}
    		  endDateId="EndDate"
    		  onDatesChange={({ startDate, endDate }) => {
    		  	let state = this.state;
    		  	if(startDate.isSame(moment(),'day')) {
    		  		startDate = moment();
    		  		this.startUpdateInterval();
    		  	} else {
    		  		this.endUpdateInterval();
    		  	}
    		  	if(!state.dates.startDate.isSame(startDate,'day') || !state.dates.endDate.isSame(endDate,'day')) {
	    		  	state.dates.startDate = startDate;
	    		  	state.dates.endDate = endDate;
	    		  	this.setState(state);
	    		  }
    		  }}
    		  focusedInput= {this.state.datePicker.focus}
    		  onFocusChange={(focusedInput) => {
    		  	let state = this.state;
    		  	state.datePicker.focus = focusedInput;
    		  	this.setState(state);
    		  }}
    		/>
    		<div>
	    		{/*<div style={{position:'absolute',bottom:10,right:10}} id='button'>
		    		<svg width={.15*Math.min(this.state.view.width,this.state.view.height)} height={.15*Math.min(this.state.view.width,this.state.view.height)}>
		    			<circle cx={.15*Math.min(this.state.view.width,this.state.view.height)/2} cy={.15*Math.min(this.state.view.width,this.state.view.height)/2} r={.15*Math.min(this.state.view.width,this.state.view.height)/2} fill={'green'}/>
		    		</svg>
	    		</div>*/}
    			<Radar subjects={this.props.subjects} dates={this.state.dates} view={this.state.radarView}/>
    		</div>
    	</div>
    )
  }
}


export default RadarScreen;  

/* known issues
* right now: on variable dividing, the rows get cut off at 20% of radius
* future: 
	* should figure out how many dots are in view
	* divide all into variable row sizes
	* figure out if row is "too large"
		* if so, divide whereever the distance between circles is largest OR divide so that it alternates even and odd to minimize center overlaps
*/
