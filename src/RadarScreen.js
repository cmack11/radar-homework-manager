import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import moment from 'moment'
import Radar from './RadarComponent/Radar.js'
import { DateRangePicker } from 'react-dates';
import AddForm from './RadarComponent/AddForm.js'
import "react-datepicker/dist/react-datepicker.css";
import TaskList from './RadarComponent/TaskList.js'




class RadarScreen extends Component {

	constructor(props) {
		super();

		let state = {
			show:props.show,
			completedAssignments:[],
			historyScreenColors:{},
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
				colors:props.view.colors,
				disable:false
			}
		}

		this.state = state;
	}

	componentWillReceiveProps(nextProps){
		let newColors = Object.assign({}, nextProps.view.colors.typeColors);
		nextProps.subjects.map((subj) =>{
			newColors[subj.name] = subj.color;
		})
		this.setState({historyScreenColors:newColors})
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
			colors:state.radarView.colors,
			disable:false
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

	//Need to combine these with the same functions in Radar
	//so they are always called together. Now sometimes the 
	//pictures don't change if only these are called 
	openAddForm() {
		this.setState({
			showAddForm:true,
			showHistoryScreen:false
		});
		this.setRadarClickable(false);
	}

	closeAddForm() {
		this.setState({
			showAddForm:false
		});
		this.setRadarClickable(true);
	}

	openHistoryScreen() {
		this.setState({
			showHistoryScreen:true,
			showAddForm:false,
		});
		this.setRadarClickable(false);
	}

	closeHistoryScreen() {
		this.setState({showHistoryScreen:false});
		this.setRadarClickable(true);
	}

	setRadarClickable(clickable) {
		let rView = this.state.radarView;
		rView.disable = !clickable;
		this.setState({radarView:rView});
	}

	completeAssignment(assignment) {
		let assignments = this.state.completedAssignments.slice();
		assignments.push(assignment);
		this.setState({completedAssignments:assignments})
	}

	openSubject(subject) {
		let show = !this.state.showHistoryScreen;
		let assignments; 

		if(!show) {
			assignments = [];
		} else {
			assignments = subject.assignments;
			this.closeHistoryScreen();
			this.closeAddForm();
		}

		this.setState({
			showHistoryScreen:show,
			completedAssignments:assignments,
			useTypeColors:show
		});
		this.setRadarClickable(!show);
	}

	

	render() {
	if(!this.props.show) return null;

	let subjectNames = [];
	this.props.subjects.map((obj)=>{
		subjectNames.push(obj.name);
	})

	let taskTypes = ["Assignment","Exam","Reading","Problem Set"];

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
    			<Radar subjects={this.props.subjects} dates={this.state.dates} view={this.state.radarView} 
    			openAddForm={this.openAddForm.bind(this)}
    			closeAddForm={this.closeAddForm.bind(this)}
    			openHistoryScreen={this.openHistoryScreen.bind(this)}
    			closeHistoryScreen={this.closeHistoryScreen.bind(this)}
    			completeAssignment={this.completeAssignment.bind(this)}
    			openSubject={this.openSubject.bind(this)}
    			/>
		    	<AddForm taskTypes={taskTypes} subjectNames={subjectNames} show={this.state.showAddForm} closeForm={this.closeAddForm.bind(this)}/>
		    	<TaskList useTypeColors={this.state.useTypeColors} visible={this.state.showHistoryScreen} title="" noDataText="No Completed Assignments Found" width={Math.min(window.innerWidth,500)} assignments={this.state.completedAssignments} colors={this.state.historyScreenColors} x={this.state.view.width/2} y={this.state.view.height/2} />
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
