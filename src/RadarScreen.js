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
				focus:'startDate'
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
				}
			}
		}

		this.state = state;
	}

	componentWillReceiveProps(nextProps){
		
    }

    componentDidMount() {
    	this.setRadarDimensions(this.state);
		window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
		let state = this.state;
		state.view.width = window.innerWidth;
		state.view.height = window.innerHeight;
		this.setRadarDimensions(state);
	}

	setRadarDimensions(state) {
		let rWidth = .75 * Math.min(state.view.width,state.view.height);
		state.radarView = {
			x:(state.view.width-rWidth) / 2,
			y:(state.view.height-rWidth) / 2,
			width:rWidth,
			height:rWidth,
			dotsView:{
				width:state.view.width,
				height:state.view.height
			}
		}
		this.setState(state);
	}

	

	render() {
	if(!this.props.show) return null;

    return (
    	<div className='radarScreen'>
    		<DateRangePicker
    		  startDate={this.state.dates.startDate}
    		  startDateId="StartDate"
    		  endDate={this.state.dates.endDate}
    		  endDateId="EndDate"
    		  onDatesChange={({ startDate, endDate }) => {
    		  	let state = this.state;
    		  	state.dates.startDate = startDate;
    		  	state.dates.endDate = endDate;
    		  	this.setState(state);
    		  }}
    		  focusedInput= {this.state.datePicker.focus}
    		  onFocusChange={(focusedInput) => {
    		  	let state = this.state;
    		  	state.datePicker.focus = focusedInput;
    		  	this.setState(state);
    		  }}
    		/>

    		<Radar subjects={this.props.subjects} dates={this.state.dates} view={this.state.radarView}/>
    	</div>
    )
  }
}


export default RadarScreen;  

/* known issues
* on single slice circle, dots will not be placed near top because of (.1,.9) boundry
* right now: on variable dividing, the rows get cut off at 20% of radius
* future: 
	* should figure out how many dots are in view
	* divide all into variable row sizes
	* figure out if row is "too large"
		* if so, divide whereever the distance between circles is largest OR divide so that it alternates even and odd to minimize center overlaps
*/
