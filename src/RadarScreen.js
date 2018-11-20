import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import moment from 'moment'
import Radar from './RadarComponent/Radar.js'
import { DateRangePicker } from 'react-dates';
import AddForm from './RadarComponent/AddForm.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HistoryPage from './HistoryPage.js'
import OverduePage from './OverduePage.js'
import SubjectPage from './SubjectPage.js'
import TaskForm from './RadarComponent/TaskForm.js'
import { connect } from 'react-redux'
import { retrieveCompletedAssignments, retrieveOverdueAssignments } from './actions/assignmentAction.js'



const mapDispatchToProps = dispatch => ({
 retrieveCompletedAssignments: (user_id) => dispatch(retrieveCompletedAssignments(user_id)),
 retrieveOverdueAssignments: (user_id) => dispatch(retrieveOverdueAssignments(user_id)),
})

const mapStateToProps = state => {
		console.log(state);
		return {
			user_id: state.user.user_id,
		}
	}





class RadarScreen extends Component {

	constructor(props) {
		super();

		let state = {
			historyScreen:{
				completedAssignments:[],
				colors:{}
			},
			overdueScreen:{
				overdueAssignments:[],
				colors:{}
			},
			subjectViewer:{

			},
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

				colors:props.view.colors,
				disable:false
			},
		}

		this.state = state;
	}

	componentWillReceiveProps(nextProps){
		let newColors = Object.assign({}, nextProps.view.colors.typeColors);
		nextProps.subjects.map((subj) =>{
			newColors[subj.name] = subj.color;
		})
		let hist = this.state.historyScreen;
		hist.colors = newColors;
		this.setState({historyScreen:hist})
    }

    componentDidMount() {
    	this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions.bind(this));
		this.startUpdateInterval();
		this.radarScreenOpenCloseFunctions = {
			openAddForm:this.openAddForm.bind(this),
			closeAddForm:this.closeAddForm.bind(this),
			openEditForm:this.openEditForm.bind(this),
			openHistoryScreen:this.openHistoryScreen.bind(this),
			closeHistoryScreen:this.closeHistoryScreen.bind(this),
			openOverdueScreen:this.openOverdueScreen.bind(this),
			closeOverdueScreen:this.closeOverdueScreen.bind(this),
			openSubjectPage:this.openSubjectPage.bind(this),
			closeSubjectPage:this.closeSubjectPage.bind(this)
		}
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

			this.props.retrieveOverdueAssignments(this.props.user_id)
			this.props.retrieveCompletedAssignments(this.props.user_id)
		},10000)
	}

	endUpdateInterval() {
		if(!this.dateUpdateInterval) return;
		clearInterval(this.dateUpdateInterval);
	}

	/*Passed to RADAR and called from there*/
	openAddForm() {
		this.setState({
			showAddForm:true,
		});
		this.closeHistoryScreen();
		this.runRadarOpenCloseFunction('closeHistoryScreen');
		this.closeOverdueScreen();
		this.runRadarOpenCloseFunction('closeOverdueScreen');
		this.closeEditForm();
		this.closeSubjectPage();
		this.setRadarClickable(false);
	}

	closeAddForm() {
		this.setState({
			showAddForm:false
		});
		this.setRadarClickable(true);
	}

	openHistoryScreen() {
		let historyScreen = this.state.historyScreen;
		historyScreen.show = true;
		this.setState({historyScreen:historyScreen});
		this.closeAddForm();
		this.runRadarOpenCloseFunction('closeAddForm');
		this.closeEditForm();
		this.closeOverdueScreen();
		this.runRadarOpenCloseFunction('closeOverdueScreen');
		this.closeSubjectPage();
		this.setRadarClickable(false);
	}

	closeHistoryScreen() {
		let historyScreen = this.state.historyScreen;
		historyScreen.show = false;
		this.setState({historyScreen:historyScreen});
		this.setRadarClickable(true);
	}
	/*Passed to RADAR and called from there*/

	openOverdueScreen() {
		let overdueScreen = this.state.overdueScreen;
		overdueScreen.show = true;
		this.setState({overdueScreen:overdueScreen});
		this.closeAddForm();
		this.runRadarOpenCloseFunction('closeAddForm');
		this.closeHistoryScreen();
		this.runRadarOpenCloseFunction('closeHistoryScreen');
		this.closeEditForm();
		this.closeSubjectPage();
		this.setRadarClickable(false);
	}

	closeOverdueScreen() {
		let overdueScreen = this.state.overdueScreen;
		overdueScreen.show = false;
		this.setState({overdueScreen:overdueScreen});
		this.setRadarClickable(true);
	}
	
	openEditForm(assignment) {
		let subjectNames = [];
		this.props.subjects.map((obj)=> {subjectNames.push(obj.name);})
		let taskTypes = ["Assignment","Exam","Reading","Problem Set"];
		
		this.setState({
			editForm: <TaskForm taskTypes={taskTypes} subjectNames={subjectNames} closeForm={this.closeEditForm.bind(this)} show={true} isEditForm={true} assignment={assignment}/>,
		});
		this.closeAddForm();
		this.runRadarOpenCloseFunction('closeAddForm');
		this.closeOverdueScreen();
		this.runRadarOpenCloseFunction('closeOverdueScreen');
		this.closeHistoryScreen();
		this.runRadarOpenCloseFunction('closeHistoryScreen');
		this.closeSubjectPage();
		this.setRadarClickable(false);
	}
	
	closeEditForm() {
		this.setState({
			editForm: null
		});
		this.setRadarClickable(true);
	}

	setRadarClickable(clickable) {
		let rView = this.state.radarView;
		rView.disable = !clickable;
		this.setState({radarView:rView});
	}

	completeAssignment(assignment) {
		let historyScreen = this.state.historyScreen;
		historyScreen.completedAssignments.push(assignment);
	}

	//Get methods from RADAR so they can be called from here
	setRadarOpenCloseFunctions(obj) {
		this.radarOpenCloseFunctions = obj;
	}

	//Used to run the open/close functions that are stored in RADAR (Change buttons)
	runRadarOpenCloseFunction(functionName) {
		if(this.radarOpenCloseFunctions && this.radarOpenCloseFunctions[functionName]) 
			this.radarOpenCloseFunctions[functionName]();
	}

	//Given to RADAR so when open/close functions are called there they are also called here
	runRadarScreenOpenCloseFunction(functionName,arg) {
		if(this.radarScreenOpenCloseFunctions && this.radarScreenOpenCloseFunctions[functionName]) 
			this.radarScreenOpenCloseFunctions[functionName](arg);
	}

	openSubjectPage(subject) {
		let subjectViewer = this.state.subjectViewer;

		subjectViewer.subject = subject;
		subjectViewer.show = true;
		subjectViewer.colors = this.state.historyScreen.colors;

		this.closeHistoryScreen();
		this.runRadarOpenCloseFunction('closeHistoryScreen');
		this.closeAddForm();
		this.runRadarOpenCloseFunction('closeAddForm');
		this.closeOverdueScreen();
		this.runRadarOpenCloseFunction('closeOverdueScreen');
		this.closeEditForm();
		this.setState({subjectViewer:subjectViewer});
		this.setRadarClickable(false);
	}

	closeSubjectPage() {
		let subjectViewer = this.state.subjectViewer;
		subjectViewer.subject = null;
		subjectViewer.show = false;
		subjectViewer.colors = [];
		this.setState({subjectViewer:subjectViewer});
		this.setRadarClickable(true);
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
    			completeAssignment={this.completeAssignment.bind(this)}
    			setRadarOpenCloseFunctions={this.setRadarOpenCloseFunctions.bind(this)}
    			runRadarScreenOpenCloseFunction={this.runRadarScreenOpenCloseFunction.bind(this)}/>
		    	<AddForm taskTypes={taskTypes} subjectNames={subjectNames} show={this.state.showAddForm} closeForm={()=>{this.closeAddForm.bind(this);this.runRadarOpenCloseFunction('closeAddForm')}}/>
		    	<HistoryPage x={this.state.view.width/2} y={this.state.view.height/2} 
		    		completedAssignments={this.state.historyScreen.completedAssignments}
		    		close={()=>{this.runRadarOpenCloseFunction('closeHistoryScreen')}}
		    		show={this.state.historyScreen.show}
		    		colors={this.state.historyScreen.colors}
		    		/>
		    	<OverduePage x={this.state.view.width/2} y={this.state.view.height/2} 
		    		overdueAssignments={this.state.overdueScreen.overdueAssignments}
		    		close={()=>{this.runRadarOpenCloseFunction('closeOverdueScreen')}}
		    		show={this.state.overdueScreen.show}
		    		colors={this.state.overdueScreen.colors}
		    		/>
		    	{this.state.editForm}
		    	<SubjectPage x={this.state.view.width/2} y={this.state.view.height/2} 
		    		subject={this.state.subjectViewer.subject}
		    		close={()=>{this.runRadarScreenOpenCloseFunction('closeSubjectPage')}}
		    		show={this.state.subjectViewer.show}
		    		colors={this.state.subjectViewer.colors}
		    		/>
    		</div>
    	</div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RadarScreen);  

/* known issues
* right now: on variable dividing, the rows get cut off at 20% of radius
* future: 
	* should figure out how many dots are in view
	* divide all into variable row sizes
	* figure out if row is "too large"
		* if so, divide whereever the distance between circles is largest OR divide so that it alternates even and odd to minimize center overlaps
*/
