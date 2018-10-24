import React, { Component } from 'react';

class DotViewer extends Component {


	constructor(props) {
		super();
	}

	componentDidMount() {
		
	}

	
	render() {

		let x,y,fill,visibility = 'hidden';
		if(this.props.dot) {
			visibility = 'visible';
			fill = this.props.dot.fill;

			x = this.props.dot.x - this.props.width/2;
			y = this.props.dot.y - this.props.height/2;

			if(x+this.props.width > window.innerWidth)
				x = Math.max(window.innerWidth - this.props.width, this.props.dot.x - this.props.width);
			if(x < 0)
				x = 0;
			if(y+this.props.height > window.innerHeight)
				y = Math.max(window.innerHeight - this.props.height, this.props.dot.y - this.props.height);
			if(y < 0)
				y = 0;
		}

		return (
			<rect id='dotViewer' 
				width={this.props.width} 
				height={this.props.height} 
				rx={15} ry={15}
				fill={fill}
				x={x} y={y}
				visibility={visibility}
				onClick={this.props.closeDotViewer}/>
		)
	}
}

export default DotViewer;