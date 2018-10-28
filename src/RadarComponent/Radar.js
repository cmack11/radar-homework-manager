import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import Dots from './Dots.js'
import util from './utils.js'
import SpinLine from './SpinLine.js'
import DotViewer from './DotViewer.js'



class Radar extends Component {

	constructor(props) {
		super();

		let state = {
			windowWidth:window.innerWidth,
			windowHeight:window.innerHeight,
			dates:props.dates,
			subjects:props.subjects,
			view:props.view
		}
		this.verifyAndDefaultSubjects(state,props);
		this.verifyAndDefaultDates(state,props);
		this.verifyAndDefaultView(state,props)

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
		if(!state.view.width)
			state.view.height = state.view.width;
		if(!state.view.dotRadiusPercent)
			state.view.dotRadiusPercent = .07;
		if(!state.view.strokeWidth)
			state.view.strokeWidth = 3;
		if(!state.view.ringsWidth)
			state.view.ringsWidth = moment().add(7,'days') - moment();
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
		this.verifyAndDefaultDates(state,props)
		this.verifyAndDefaultView(state,props)
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
		this.view = view;
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
		this.fillDimensions();
		this.fillRings();
		this.fillComponents();
	}

	updateDimensions() {
		let state = this.state;
		state.windowWidth = window.innerWidth;
		state.windowHeight = window.innerHeight;
		this.setState(state);
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

	

	makeDot(dot) {
		var distanceFromCenter = dot.distanceFromCenter;
		var angle = dot.startAngle + dot.angle;
		var point = this.polarToCartesian(this.view.dots.center.x,this.view.dots.center.y,distanceFromCenter,angle);
		if(!dot.r) dot.r = this.view.dots.radius;

		return <circle cx={point.x} cy={point.y} r={dot.r} fill={dot.color}
				 key={dot.key} draggable={true}
				 onMouseDown={this.onMouseDownDot.bind(this)}
				 />;
	}

	getDistanceFromCenter(assignment) {
		if(!assignment) return 0;
		let date = assignment.dueDate;
		if(!date) return 0;

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
			height:Math.min(300, width),
		}
		view.style = {
			strokeWidth:this.state.view.strokeWidth,
			strokeColor:this.state.view.colors.subjectDivider
		}
		this.view = view;
	}

	fillComponents() {
		var sliceComponents = [];
		let numSlices = this.state.subjects.length;
		let offset = 0;
		let angle = 360/numSlices;
		if(angle === 360) angle -= .01;

		if(numSlices === 0)
			sliceComponents = <circle cx={this.view.radar.center.x} cy={this.view.radar.center.y} r={this.view.radar.radius} fill={'none'}/>;
		for(let i = 0; i < this.state.subjects.length; i++) {
			if(this.state.subjects.length > 1) {
				sliceComponents.push(<path d={this.describeSlice(this.view.radar.center.x,this.view.radar.center.y,this.view.radar.radius,offset+i*angle,offset+(i+1)*angle)} fill={this.state.subjects[i].color} key={this.state.subjects[i].name}/>)
			} else if(this.state.subjects.length === 1) {
				sliceComponents.push(<circle cx={this.view.radar.center.x} cy={this.view.radar.center.y} r={this.view.radar.radius} fill={this.state.subjects[i].color}/>)
			}
		}
		let state = this.state;
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

	render() {
		
		let intersectFuncs = [{
			rect:{x:0, y:0, width:100, height:100},
			func:function(){console.log('intersect!')}
		},{
			rect:{x:0, y:0, width:500, height:100},
			func:function(){console.log('intersect!')}
		}]



    return (
    	<svg id='radar' width={this.props.view.dotsView.width} height={this.props.view.dotsView.height}>
	      	<svg x={this.view.radar.x} y={this.view.radar.y} width={this.state.view.width} height={this.state.view.height} strokeWidth={this.view.style.strokeWidth} stroke={this.view.style.strokeColor}>
		  		{this.state.sliceComponents}
		  		<circle cx={this.view.radar.center.x} cy={this.view.radar.center.y} r={this.view.dots.radius} fill={this.view.style.strokeColor}/>
		  		{this.state.rings}
			</svg>
			<Dots subjects={this.state.subjects} 
				getDistanceFromCenter={this.getDistanceFromCenter.bind(this)} 
				view={this.state.view} dims={this.view} //bad
				intersectFunctions={intersectFuncs}
				intersectsLine={this.intersectsLine.bind(this)}
				setClickedDot={this.setClickedDot.bind(this)}
				/>
	      	<svg x={this.view.radar.x} y={this.view.radar.y} width={this.state.view.width} height={this.state.view.height} strokeWidth={this.view.style.strokeWidth} stroke={this.view.style.strokeColor}>
				<SpinLine center={this.view.radar.center} radius={this.view.radar.radius} lineColor={this.view.style.strokeColor} rpm={6} show={true} setLineAngle={this.setLineAngle.bind(this)}/>
			</svg>
			<DotViewer width={250} height={200} dot={this.state.clickedDot} closeDotViewer={() => {this.setState({clickedDot:null})}}/>
		</svg>
    )
  }
}

Radar.propTypes = {
  	view: PropTypes.object.isRequired,
  	subjects: PropTypes.array.isRequired,
  	dates: PropTypes.object
}

export default Radar;  

/* known issues
* on single slice circle, dots will not be placed near top because of (.1,.9) boundry
* right now: on variable dividing, the rows get cut off at 20% of radius
* future: 
	* should figure out how many dots are in view
	* divide all into variable row sizes
	* figure out if row is "too large"
		* if so, divide whereever the distance between circles is largest OR divide so that it alternates even and odd to minimize center overlaps
*/
