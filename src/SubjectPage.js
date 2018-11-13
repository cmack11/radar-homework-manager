import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import moment from 'moment'
import TaskList from './RadarComponent/TaskList.js'
import image from './images/window_close.svg'



const padding = 10;

class SubjectPage extends Component {

	constructor(props) {
		super();

		let state = {
			top:100,
			left:100
		}

		this.state = state;
	}

	componentDidMount() {
    	this.resize();
  	}

	componentWillReceiveProps(nextProps){
		this.resize();
	}

	resize() {
	  let height = 307, width = this.props.width;//What it usually shows up as the first time
	  let e = document.getElementById('subjectPage');
	  if(e){
	      height = e.getBoundingClientRect().height;
	      width = e.getBoundingClientRect().width;
	  }

	  let top = this.props.y-height/2+40;
	  let left = this.props.x-width/2-padding;

	  this.setState({top:top, left:left} )
	}


	

	render() {

		let visible = this.props.show ? 'visible' : 'hidden';
		let assignments = [], color = 'tan', subjectName = 'FILLER';
		if(this.props.subject) {
			assignments = this.props.subject.assignments;
			color = this.props.subject.color;
			subjectName = this.props.subject.name;
		}

	    return (
	    	<div id="subjectPage" style={{
	    			visibility:visible,
	    	        position:'absolute',
	    	        top:this.state.top,
	    	        left:this.state.left,
	    	        padding:padding,
	    	        width:'75%',
	    	        background:color,
	    	        border:5,
	    	        borderColor:'black',
	    	        borderStyle:'solid'
	    	    }}>
	    	    <div style={{display:'flex'}}>
	    	      <img style={{cursor:'pointer'}} onClick={this.props.close} src={image} height="5%" width="5%" />
	    	      <span style={{verticalAlign:'middle',flexGrow:2,fontSize:'28px'}}><b>{subjectName}</b></span>
	    	    </div>
	    		<TaskList 
	    			visible={this.props.show}
	    			useTypeColors={true} 
	    			title="" 
	    			noDataText={subjectName+' Has No Assignments'} 
	    			width={Math.min(window.innerWidth,500)} 
	    			assignments={assignments} 
	    			colors={this.props.colors}
	    			onResize={this.resize.bind(this)} />
			</div>
	    )
  }
}


export default SubjectPage;  

