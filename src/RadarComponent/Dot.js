import React, { Component } from 'react';
//import moment from 'moment'
//import PropTypes from 'prop-types';

class Dot extends Component {


	constructor(props) {
		super();
		this.minOpacity = .1;
		this.opacityStep = .03;
		this.state = {opacity:this.minOpacity}
		
	}

	startFadeOut() {
		this.fadeOut();
		this.fOut = setInterval(() => {
			this.fadeOut();
			if(this.state.opacity <= this.minOpacity) {
				clearInterval(this.fOut);
				this.fOut = null;
			}

		},400)
 	}

	fadeOut() {
		let opacity = Math.max(this.minOpacity,this.state.opacity - this.opacityStep);
		this.setState({opacity:opacity});
	}

	componentDidMount() {
		if(this.props.dot)
			this.props.dot.restartFadeOut = this.restartFadeOut.bind(this);
		if(this.props.animateFades) {
			this.checkIntersect = setInterval(() => {
				if(this.props.intersectsLine(this.props.dot,this.getId())){
					this.startFadeIn();
				}
			},50)
		} else {
			this.setState({opacity:1})
		}
	}

	componentWillUnmount() {
		if(this.checkIntersect)
			clearInterval(this.checkIntersect);
		if(this.fOut)
			clearInterval(this.fOut);
	}

	getId() {
		return this.props.center.x+'/'+this.props.center.y;
	}

	startFadeIn() {
		if(this.fOut) {
			clearInterval(this.fOut);
			this.fOut = null;
		}
		this.fadeIn();
		this.startFadeOut();
		/*let fIn = setInterval(() => {
			this.fadeIn();
			if(this.state.opacity >= 1) {
				this.fadeOut();
				clearInterval(fIn);
			}
		},300)*/
	}

	fadeIn() {
			let opacity = 1//Math.min(1,this.state.opacity + (this.opacityStep*50));
			this.setState({opacity:opacity});
	}

	restartFadeOut() {
		this.fadeOut();
	}

	onMouseDown(e) {
		this.props.onMouseDown(e,this.props.dot);
	}


	render() {
		if(!this.props.center || this.props.center.x < 0 || this.props.center.y < 0 || this.props.radius < 0)
			return null;

		return (
			<circle id={this.getId()} cx={this.props.center.x} cy={this.props.center.y} r={this.props.radius} fill={this.props.fill}
				 draggable={true} opacity={this.state.opacity} 
				 onMouseDown={this.onMouseDown.bind(this)}
				 cursor='pointer'
				 />

		)
	}
}

export default Dot;

//need to find a way to have the dragged dot be on top of the spinline, but stationary dots be below
//And also have dotviewer be on top of spinline

