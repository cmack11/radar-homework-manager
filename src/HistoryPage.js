import React, { Component } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import moment from 'moment'
import TaskList from './RadarComponent/TaskList.js'
import image from './images/window_close.svg'
import { retrieveCompletedTasks } from './actions/assignmentAction.js'



const mapDispatchToProps = dispatch => ({
 retrieveCompletedTasks: (user_id) => dispatch(retrieveCompletedTasks(user_id)),
})

const mapStateToProps = state => {
		return {
			user_id: state.user.user_id,
			assignments: state.assignment.completedAssignments,
		}
	}


const padding = 10;

class HistoryPage extends Component {

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
		if(nextProps.show && this.props.show !== nextProps.show) {
			this.props.retrieveCompletedTasks(this.props.user_id)
		}
	}

	resize() {
	  let height = 307, width = this.props.width;//What it usually shows up as the first time
	  let e = document.getElementById('historyScreen');
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

	    return (
	    	<div id="historyScreen" style={{
	    			visibility:visible,
	    	        position:'absolute',
	    	        top:this.state.top,
	    	        left:this.state.left,
	    	        padding:padding,
	    	        width:'75%',
	    	        background:'#8B4513',
	    	        border:5,
	    	        borderColor:'black',
	    	        borderStyle:'solid'
	    	    }}>
	    	    <div style={{display:'flex'}}>
	    	      <img style={{cursor:'pointer'}} onClick={this.props.close} src={image} height="5%" width="5%" />
	    	      <span style={{verticalAlign:'middle',flexGrow:2,fontSize:'28px'}}><b>History</b></span>
	    	    </div>
	    		<TaskList 
	    			visible={this.props.show}
	    			useTypeColors={false} 
	    			title="" 
	    			noDataText="No Completed Assignments Found" 
	    			width={Math.min(window.innerWidth,500)} 
	    			assignments={this.props.assignments} 
	    			colors={this.props.colors}
	    			onResize={this.resize.bind(this)} />
			</div>
	    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);  

