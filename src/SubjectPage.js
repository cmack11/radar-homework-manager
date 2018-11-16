import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import moment from 'moment'
import TaskList from './RadarComponent/TaskList.js'
import closeIcon from './images/window_close.svg'
import editIcon from './images/pencil_icon.svg'
import checkmarkIcon from './images/checkmark_icon.png'
import trashIcon from './images/trash_icon.png'



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
		if(this.props.subject != nextProps.subject)
			this.setState({editMode:false})
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


	startEditMode(){
		this.setState({editMode:true,newSubjectName:this.props.subject.name});
	}

	onChange(event) {
	  const target = event.target;
	  const name = target.name;
	  let value = target.value;

	  this.setState({
	    [name]: value
	  });
	}

	onSubmit() {
		if(!this.state.newSubjectName || this.state.newSubjectName.length < 1 || this.state.newSubjectName.length > 14) return;
		//Need api or reducer to make this change faster and more universal
		this.props.subject.name = this.state.newSubjectName;
		this.setState({editMode:false})
	}

	deleteSubject() {
		let subject = this.props.subject;
		if (window.confirm('Are you sure you wish to delete '+subject.name+'? This action will also delete all assignments associated with this subject and can not be undone')) {
			//should delete the subject
		}
	}
	

	render() {

		let visible = this.props.show ? 'visible' : 'hidden';
		let assignments = [], color = 'tan', subjectName = 'FILLER';
		if(this.props.subject) {
			assignments = this.props.subject.assignments;
			color = this.props.subject.color;
			subjectName = this.props.subject.name;
		}

		let header;
		if(this.state.editMode) {
			header = (
				<div>
					<input style={{verticalAlign:'middle',fontSize:'2.5vw'}} name="newSubjectName" type="text" value={this.state.newSubjectName} onChange={this.onChange.bind(this)}/>
					<img style={{verticalAlign:'middle',paddingLeft:5,cursor:'pointer'}} onClick={this.onSubmit.bind(this)} src={checkmarkIcon} height="100%" width="10%" />
				</div>);
		} else {
			header = (<b style={{verticalAlign:'middle',fontSize:'28px'}}>
		    	      		{subjectName}
		    	      		<img style={{paddingLeft:5,cursor:'pointer'}} onClick={this.startEditMode.bind(this)} src={editIcon} height="100%" width="10%" />
		    	      	</b>);
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
	    	      	{header}
	    	      </div>
	    	      <div style={{width:'10%',display:'inline-block'}}>
	    	      	<img style={{cursor:'pointer'}} onClick={this.deleteSubject.bind(this)} src={trashIcon} height="50%" width="50%" />
	    	      </div>
	    	    </div>
	    		<TaskList 
	    			hideSubjectCol
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

