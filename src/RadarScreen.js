import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import Radar from './RadarComponent/Radar.js'
import { DateRangePicker } from 'react-dates';
import SubjectForm from './RadarComponent/SubjectForm.js'
import TaskForm from './RadarComponent/TaskForm.js'
import Buttons from './RadarComponent/Buttons.js'
import AddForm from './RadarComponent/AddForm.js'
import EditTaskForm from './RadarComponent/EditTaskForm.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




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
			},
			editDot:{},
			isEditForm: false,
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

	openAddForm() {
		this.setState({showAddForm:!this.state.showAddForm});
	}
	
	openEditForm(dot) {
		this.setState({showEditForm: true, editDot: dot, isEditForm: true});
	}
	
	closeEditForm() {
		this.setState({showEditForm: false, editDot: null, isEditForm: false})
	}

	render() {
	if(!this.props.show) return null;

	let subjectNames = [];
	this.props.subjects.map((obj)=>{
		subjectNames.push(obj.name);
	})

	let taskTypes = ["Assignment","Exam","Reading","Problem Set"]; 
	
	let form = <TaskForm taskTypes={taskTypes} subjectNames={subjectNames} closeform={this.closeEditForm.bind(this)} show={this.state.showEditForm} isEditForm={this.state.isEditForm} assignment={this.state.editDot.assignment}/>;
	
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
    			<Radar subjects={this.props.subjects} dates={this.state.dates} view={this.state.radarView} openAddForm={this.openAddForm.bind(this)} openEditForm={this.openEditForm.bind(this)}/>
		    	<AddForm taskTypes={taskTypes} subjectNames={subjectNames} show={this.state.showAddForm}/>
		    	{form}
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
