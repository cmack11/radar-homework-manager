import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import moment from 'moment'
import TaskList from './RadarComponent/TaskList.js'
import closeIcon from './images/window_close.svg'
import editIcon from './images/pencil_icon.svg'



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
	    	    <div style={{width:'100%', height:'10%',display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:'10px'}}>
	    	      <div style={{width:'10%',display:'inline-block',textAlign:'left'}}>
	    	      	<img style={{cursor:'pointer'}} onClick={this.props.close} src={closeIcon} height="50%" width="50%" />
	    	      </div>
	    	      <div style={{width:'50%',display:'inline-block'}}>
	    	      	<b style={{verticalAlign:'middle',fontSize:'28px'}}>
	    	      		{subjectName}
	    	      		<img style={{paddingLeft:5,cursor:'pointer'}} onClick={()=>{}} src={editIcon} height="100%" width="6%" />
	    	      	</b>
	    	      </div>
	    	      <div style={{width:'10%',display:'inline-block'}}></div>
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

