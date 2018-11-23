import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import { connect } from 'react-redux'
import Dots from './Dots.js'
import util from './utils.js'
import SpinLine from './SpinLine.js'
import DotViewer from './DotViewer.js'
import DraggedDot from './DraggedDot.js'
//import addButton from '../images/add_button.png'
//import closeAddButton from '../images/add_button_close.png'
//import editButton from '../images/edit_button.png'
//import completedButton from '../images/completed_button.png'
//import historyButton from '../images/history_button.png'
import overdueButton from '../images/Overdue_button.png'
//import closeHistoryButton from '../images/history_button_close.png'
import closeOverdueButton from '../images/overdue_button_close.png'
import { Icon } from 'semantic-ui-react'
import '../App.css';
import { completeTask } from '../actions/assignmentAction.js'
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { MdNotifications } from 'react-icons/md';


const addButton = 'plus';
const closeAddButton = 'minus';
const completedButton = 'checkmark';

const historyButton = 'history';
const closeHistoryButton = 'close';
const editButton = 'pencil alternate';

const mapDispatchToProps = dispatch => ({
 completeTask : (data) => dispatch(completeTask(data))
})

const mapStateToProps = state => {
		return {
			id: state.user.user_id,
			overdueAssignments : state.assignment.overdueAssignments,
		}
	}

class Radar extends Component {

	constructor(props) {
		super();

		let state = {
			windowWidth:window.innerWidth,
			windowHeight:window.innerHeight,
			dates:props.dates,
			subjects:props.subjects,
			view:props.view,
			buttons:{
				width:115,
				left:{logo:historyButton},
				overdue:{logo:overdueButton},
				right:{logo:addButton}
			},
			noOverdue: false
		}
		this.verifyAndDefaultSubjects(state,props);
		this.verifyAndDefaultDates(state,props);
		this.verifyAndDefaultView(state,props)
		this._openAddButton = false
		this._openHistoryButton = false
    this._openEditButton = false
    this._openCompletedButton = false
		this.state = state;
		this.setDefault();
	}

	//Need to do the same with subjects and view and do it in a cleaner way
	componentWillReceiveProps(nextProps){
		let state = this.state;
        if(nextProps !== this.props){
        	this.propsToState(nextProps,state);
            this.setState(state);
            this.fillDimensions();
            this.fillRings();
            this.fillComponents();
        }


    }

	verifyAndDefaultSubjects(state,props) {
		if(!state.subjects)
			state.subjects = [];
	}

	verifyAndDefaultDates(state,props) {
		if(!state.dates) state.dates = {};
		if(!state.dates.startDate) state.dates.startDate = moment();
		if(!state.dates.endDate) {
			if(props.view && props.view.ringsWidth)
				state.dates.endDate = moment(state.dates.startDate).add(props.view.ringsWidth,'ms');
			else
				state.dates.endDate = moment(state.dates.startDate).add(7,'days');
		}
	}

	verifyAndDefaultView(state,props) {
		if(!state.view)
			state.view = {};
		if(!state.view.x)
			state.view.x = 0;
		if(!state.view.y)
			state.view.y = 0;
		if(!state.view.width)
			state.view.width = 250;
		if(!state.view.height)
			state.view.height = state.view.width;
		if(!state.view.dotRadiusPercent)
			state.view.dotRadiusPercent = .07;
		if(!state.view.strokeWidth)
			state.view.strokeWidth = 3;
		if(!state.view.ringsWidth) {
			let today = moment();
			let end = moment(today).add(7,'days');
			state.view.ringsWidth = end - today;
		}
		if(!state.view.colors)
			state.view.colors = {};
		if(!state.view.colors.subjectDivider)
			state.view.colors.subjectDivider = "#39ff14";
		if(!state.view.colors.typeColors)
			state.view.colors.typeColors = {};
	}

	propsToState(props,state) {
		state.subjects = props.subjects;
		state.dates = props.dates;
		state.view = props.view;
		this.verifyAndDefaultSubjects(state,props)
		this.verifyAndDefaultView(state,props)
		this.verifyAndDefaultDates(state,props)
	}

	setDefault() {
		let width = 1;
		let dotPercent = 0
		let view = {};
		view.radar = {
			x:0,
			y:0,
			width:width,
			height:width,
			radius:width/2,
			center:{x:width/2, y:width/2}

		};
		view.dots = {
			center:{x:view.radar.x+view.radar.center.x, y:view.radar.y+view.radar.center.y},
			radius:dotPercent * view.radar.radius
		}
		view.dotViewer={
			width:1,
			height:1,
		}
		view.style = {
			strokeWidth:0,
			strokeColor:0
		}
		view.buttons = {
			width:0
		}
		this.view = view;
	}

	componentDidMount() {
		this.fillDimensions();
		this.fillRings();
		this.fillComponents();
		if(this.props.setRadarOpenCloseFunctions) {
			this.props.setRadarOpenCloseFunctions({
				openAddForm:this.openAddForm.bind(this),
				closeAddForm:this.closeAddForm.bind(this),
				openHistoryScreen:this.openHistoryScreen.bind(this),
				closeHistoryScreen:this.closeHistoryScreen.bind(this),
				openOverdueScreen:this.openOverdueScreen.bind(this),
				closeOverdueScreen:this.closeOverdueScreen.bind(this),
			});
		}
		this.closeDotViewer =  this.closeDotViewer.bind(this);
	}

	describeSlice(x, y, radius, startAngle, endAngle) {

	    var start = util.polarToCartesian(x, y, radius, endAngle);
	    var end = util.polarToCartesian(x, y, radius, startAngle);

	    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	    var d = [
	        "M", x,y,
	        "L", start.x, start.y,
	        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
	        "L", x, y
	    ].join(" ");
	    return d;

	}

	makeLabel(subject, x, y, radius, startAngle, endAngle) {
		let fontSize;
		if(window.innerWidth > 500) {
			fontSize = 24;
		} else if(window.innerWidth < 250) {
			fontSize = 12;
		} else {
			fontSize = 18;
		}
		let width = subject.name.length*fontSize/2;
		let height = 0;

	    let angle = startAngle+(endAngle-startAngle)/2;
	    var point = util.polarToCartesian(x, y, radius, angle);

	    if(Math.abs(point.x - this.view.dots.center.x) < .01)//On prime meridian
	    	point.x = this.view.dots.center.x - width/2;
	    else if(point.x < this.view.dots.center.x)//left hemisphere
	    	point.x -= width;
	    if(Math.abs(point.y - this.view.dots.center.y) < .1)//On equater
	    	point.y = this.view.dots.center.y - height/2;
	    else if(point.y < this.view.dots.center.y)//upper hemisphere
	    	point.y -= height;

		return <text x={point.x} y={point.y} onClick={() => {this.openSubject(subject)}} fontSize={fontSize} fill={subject.color} stroke={subject.color} cursor='pointer'>{subject.name}</text>
	}

	openSubject(subject) {
		this.props.runRadarScreenOpenCloseFunction('openSubjectPage',subject)
		//Open a subject viewer when the subject label is selected
		//Can view list of assignments and change name of subject
	}

	getDistanceFromCenter(assignment) {
		if(!assignment) return 0;
		let date = moment(assignment.dueDate);
		if(!date || !date.isValid()) return 0;

		let percent = this.scaleTimeToPercent(date);
		let minPercent = 1.8*this.state.view.dotRadiusPercent;
		if(percent <= 0) return -1;
		if(percent > 1) return -2;
		let distance = (minPercent*this.view.radar.radius) + percent*(1-minPercent)*this.view.radar.radius;
		return distance;
	}

	scaleTimeToPercent(date) {
		let zero = this.state.dates.startDate.valueOf();
		let one = this.state.dates.endDate.valueOf();
		let middle = date.valueOf();
		return (middle - zero) / (one - zero)
	}


	fillDimensions() {
		let width = this.state.view.width;
		let dotPercent = (this.state.view.dotRadiusPercent ? this.state.view.dotRadiusPercent : .05)
		let view = {};
		view.radar = {
			x:this.state.view.x,
			y:this.state.view.y,
			width:width,
			height:width,
			radius:Math.max(width/2 - this.state.view.strokeWidth, 0),
			center:{x:width/2, y:width/2}

		};
		view.dots = {
			center:{x:view.radar.x+view.radar.center.x, y:view.radar.y+view.radar.center.y},
			radius:dotPercent * view.radar.radius
		}
		view.dotViewer={
			width:Math.min(250, width),
			height:Math.min(300, width)
		}
		view.style = {
			strokeWidth:this.state.view.strokeWidth,
			strokeColor:this.state.view.colors.subjectDivider
		}
		view.buttons = {
			width:(.2 * width)
		}
		this.view = view;
	}

	fillComponents() {
		var sliceComponents = [];
		var sliceLabels = [];
		let numSlices = this.state.subjects.length;
		let offset = 0;
		let angle = 360/numSlices;
		if(angle === 360) angle -= .01;

		if(numSlices === 0) {
			sliceComponents = <circle cx={this.view.radar.center.x} cy={this.view.radar.center.y} r={this.view.radar.radius} fill={'none'}/>;
		}
		for(let i = 0; i < this.state.subjects.length; i++) {
			if(this.state.subjects.length > 1) {
				sliceComponents.push(<path d={this.describeSlice(this.view.radar.center.x,this.view.radar.center.y,this.view.radar.radius,offset+i*angle,offset+(i+1)*angle)} fill={this.state.subjects[i].color} key={this.state.subjects[i].name}/>)
				sliceLabels.push(this.makeLabel(this.state.subjects[i],this.view.dots.center.x,this.view.dots.center.y,this.view.radar.radius*1.07,offset+i*angle,offset+(i+1)*angle))
			} else if(this.state.subjects.length === 1) {
				sliceComponents.push(<circle cx={this.view.radar.center.x} cy={this.view.radar.center.y} r={this.view.radar.radius} fill={this.state.subjects[i].color}/>)
				sliceLabels.push(this.makeLabel(this.state.subjects[i],this.view.dots.center.x,this.view.dots.center.y,this.view.radar.radius*1.05,0,0))

			}
		}
		let state = this.state;
		state.sliceLabels = sliceLabels;
		state.sliceComponents = sliceComponents;
		this.setState(state);
	}

	fillRings() {
		let rings = [];
		let step = this.scaleTimeToPercent(moment(this.state.dates.startDate).add(this.state.view.ringsWidth))

		for(let percent = step; percent < 1; percent+=step) {
			let radius = percent*this.view.radar.radius;
			rings.push(<circle cx={this.view.radar.center.x} cy={this.view.radar.center.y} r={radius} fill='none' key={'Ring at '+percent+'of radius'}/>)
		}
		let state = this.state;
		state.rings = rings;
		this.setState(state);
	}

	setLineAngle(angle) {this.lineAngle = angle}

	intersectsLine(dot,id) {
		let angle = dot.startAngle + dot.angle;
		return Math.abs(this.lineAngle - angle) < 1;
	}

	setClickedDot(dot) {this.setState({clickedDot:dot})}

	setDraggedDot(dot) {
		let state = this.state;

		if(dot) {
			state.buttons.left.logo = completedButton;
			state.buttons.right.logo = editButton;
			state.draggedDot = dot;
		} else {
			state.buttons.left.logo = historyButton;
			state.buttons.right.logo = addButton;
			delete state.draggedDot;
		}

		this.setState(state)
	}

	addButtonClick() {
		let buttons = this.state.buttons;
		if(buttons.right.logo === addButton) {
			this.closeHistoryScreen();//order matters
			this.openAddForm();
		} else {
			this.closeAddForm();
		}
		this.setState({buttons:buttons})
	}

	openAddForm() {
		let buttons = this.state.buttons;
		buttons.right.logo = closeAddButton;
		this.props.runRadarScreenOpenCloseFunction('openAddForm');
		this.setState({buttons:buttons})
	}

	closeAddForm() {
		let buttons = this.state.buttons;
		buttons.right.logo = addButton;
		this.props.runRadarScreenOpenCloseFunction('closeAddForm');
		this.setState({buttons:buttons})
	}

	historyButtonClick() {
		if(this.state.buttons.left.logo === historyButton) {
			this.closeAddForm();//order matters
			this.openHistoryScreen();
		} else {
			this.closeHistoryScreen();
		}
	}

	openHistoryScreen() {
		let buttons = this.state.buttons;
		buttons.left.logo = closeHistoryButton;
		this.props.runRadarScreenOpenCloseFunction('openHistoryScreen');
		this.setState({buttons:buttons})
	}

	closeHistoryScreen() {
		let buttons = this.state.buttons;
		buttons.left.logo = historyButton;
		this.props.runRadarScreenOpenCloseFunction('closeHistoryScreen');
		this.setState({buttons:buttons})
	}

	overdueButtonClick() {
		let buttons = this.state.buttons;
		if(buttons.overdue.logo === overdueButton){
			this.closeAddForm();//order matters
			this.openOverdueScreen();
		} else {
			this.closeOverdueScreen();
		}
	}

	openOverdueScreen() {
		let buttons = this.state.buttons;
		buttons.overdue.logo = closeOverdueButton;
		this.props.runRadarScreenOpenCloseFunction('openOverdueScreen');
		this.setState({buttons:buttons})
	}

	closeOverdueScreen() {
		let buttons = this.state.buttons;
		buttons.overdue.logo = overdueButton;
		this.props.runRadarScreenOpenCloseFunction('closeOverdueScreen');
		this.setState({buttons:buttons})
	}

	editButtonClick(assignment) {
		this.props.runRadarScreenOpenCloseFunction('openEditForm', assignment);
	}

	closeDotViewer() {
		let state = this.state;
		delete state.clickedDot;
		this.setState(state)
	}

	render() {
		let intersectFuncs = [];

		intersectFuncs.push({
			rect:{x:10, y:this.props.view.dotsView.height-125-10, width:125, height:125},
			func:(dot)=>{
				dot.dot.setAttribute('visibility','hidden');
				this.props.completeTask(dot.assignment);
			}
		})

		intersectFuncs.push({
			rect:{x:this.props.view.dotsView.width-this.state.buttons.width-10, y:this.props.view.dotsView.height-125-10, width:125, height:125},
			func:(dot)=>{this.editButtonClick(dot.assignment)}
		})

    /*  <Badge badgeContent={5} color="secondary" className="overdueButton" onClick={this.overdueButtonClick.bind(this)}>
        <MdNotifications />
        </Badge>
    */
		let overDueImage =
    <image style={{cursor:'pointer'}} onClick={this.overdueButtonClick.bind(this)} href={this.state.buttons.overdue.logo} x={10} y={10} width={this.view.buttons.width} height={this.view.buttons.width}/>;
		if(!this.props.overdueAssignments.length){
			overDueImage = null;
		}

    return (
    	<div id='radardiv' style={{position:'absolute'}}>
			<Icon name={this.state.buttons.right.logo} circular size='huge' className={(this.state.draggedDot ? "plus-button button-behind" : "plus-button" )} style={{background : (this.state.draggedDot) ? "#12CBC4" : "#ED4C67"}} onClick={this.addButtonClick.bind(this)}/>
			<Icon name={this.state.buttons.left.logo} circular size='huge' className={(this.state.draggedDot ? "history-button button-behind" :"history-button" )} style={{background : (this.state.draggedDot) ? "#A3CB38" : "#F79F1F"}}  onClick={this.historyButtonClick.bind(this)}/>
	    	<svg id='radar' width={this.props.view.dotsView.width} height={this.props.view.dotsView.height}  strokeWidth='2' stroke='black'>
		      	<svg x={this.view.radar.x} y={this.view.radar.y} width={this.state.view.width} height={this.state.view.height} strokeWidth={this.view.style.strokeWidth} stroke={this.view.style.strokeColor}>
			  		{this.state.sliceComponents}
			  		<circle cx={this.view.radar.center.x} cy={this.view.radar.center.y} r={this.view.dots.radius} fill={this.view.style.strokeColor}/>
			  		{this.state.rings}
				</svg>
				{this.state.sliceLabels}
				<Dots subjects={this.state.subjects}
					getDistanceFromCenter={this.getDistanceFromCenter.bind(this)}
					view={this.state.view} dims={this.view} //bad
					intersectFunctions={intersectFuncs}
					intersectsLine={this.intersectsLine.bind(this)}
					setClickedDot={this.setClickedDot.bind(this)}
					setDraggedDot={this.setDraggedDot.bind(this)}
					/>
		      	<svg x={this.view.radar.x} y={this.view.radar.y} width={this.state.view.width} height={this.state.view.height} strokeWidth={this.view.style.strokeWidth} stroke={this.view.style.strokeColor}>
					<SpinLine center={this.view.radar.center} radius={this.view.radar.radius} lineColor={this.view.style.strokeColor} rpm={6} show={true} setLineAngle={this.setLineAngle.bind(this)}/>
				</svg>
				{overDueImage}
				<DraggedDot dot={this.state.draggedDot} radius={this.view.dots.radius*1.5} intersectFunctions={intersectFuncs}/>
			</svg>
			<DotViewer width={250} height={200} dot={this.state.clickedDot} edit={this.editButtonClick.bind(this)} delete={()=>{}} complete={this.props.completeTask} close={this.closeDotViewer}/>
		</div>
    )
  }
}

Radar.propTypes = {
  	view: PropTypes.object.isRequired,
  	subjects: PropTypes.array.isRequired,
  	dates: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Radar);


/* known issues
* on single slice circle, dots will not be placed near top because of (.1,.9) boundry
* right now: on variable dividing, the rows get cut off at 20% of radius
* future:
	* should figure out how many dots are in view
	* divide all into variable row sizes
	* figure out if row is "too large"
		* if so, divide whereever the distance between circles is largest OR divide so that it alternates even and odd to minimize center overlaps
*/
