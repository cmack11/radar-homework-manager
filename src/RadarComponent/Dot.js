import React, { Component } from 'react';
//import moment from 'moment'
import util from './utils.js'
import DotViewer from './DotViewer.js'
import PropTypes from 'prop-types';

class Dot extends Component {


	constructor(props) {
		super();

		this.state = {opacity:1}
		
	}

	startFading() {
		let min = .2
		let interval = setInterval(() => {
			let state = this.state;
			state.opacity = Math.max(min,state.opacity - .01);
			this.setState(state);
			if(state.opacity <= min)
				clearInterval(interval);
		},10)
	}

	componentDidMount() {
		this.props.dot.restartFading = this.restartFading.bind(this);
	}

	restartFading() {
		let state = this.state;
		state.opacity = 1;
		this.setState(state);
		this.startFading();
	}


	render() {

		


		return (
			<circle cx={this.props.center.x} cy={this.props.center.y} r={this.props.radius} fill={this.props.fill}
				 draggable={true} opacity={this.state.opacity} 
				 onMouseDown={this.props.onMouseDown}
				 />

		)
	}
}

export default Dot;

//need to find a way to have the dragged dot be on top of the spinline, but stationary dots be below
//And also have dotviewer be on top of spinline

