import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {subjects1} from '../fakeData.js'

/*
TaskList props:
    visible = true/false - defaults true
    title = String (This title will be shown above the table)
    width
    height
    hideSubjectCol = true/false - defaults to false
    assignments = array of assignments to display.
        assignments should have a .name, .subject, .description, .type, and .dueDate (moment)
*/

const padding = 20;

class TaskList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {visible: this.props.visible};
  }

  componentWillReceiveProps(nextProps){
    this.setState({visible:nextProps.visible})
  }


  getTrProps(state, rowInfo, column) {
    if(!rowInfo) return {};
    let color = 'none';
    if(this.props.useTypeColors) {
        let type = rowInfo.original.type;
        if(this.props.colors && this.props.colors[type])
            color = this.props.colors[type];
    } else {
        let subject = rowInfo.original.subject;
        if(this.props.colors && this.props.colors[subject])
            color = this.props.colors[subject];
    }

    return {
        style:{
            background:color
        }
    }
  }

  render() {
    if (!this.state.visible)
        return(<null />);


    let hideSubjectCol = true;//this.props.hideSubjectCol !== undefined && this.props.hideSubjectCol;
    if(this.props.assignments && this.props.assignments.length) {
        let subject = this.props.assignments[0].subject;
        for(let i = 1; i < this.props.assignments.length && hideSubjectCol; i++)
            if(this.props.assignments[i].subject !== subject)
                hideSubjectCol = false;
    }


    let columns = [];
    columns.push(
        {
            Header: 'Name',
            accessor: 'name'
        });
    if (!hideSubjectCol)
    {
        columns.push(
        {
            Header: 'Subject',
            accessor: 'subject'
        });
    }
    columns.push.apply(columns,
    [
        {
            Header: 'Description',
            accessor: 'description'
        },
        {
            Header: 'Type',
            accessor: 'type'
        },
        {
            Header: 'Due Date',
            accessor: 'dueDate',
            Cell: props => <span className='dueDate'>{props.value.format("MM/DD/YYYY")}</span>
        }
    ]);

    const data = this.props.assignments !== undefined ? this.props.assignments : subjects1[0].assignments;

    let top = this.props.y-this.props.height/2 - padding/2 - 50;
    let left = this.props.x-this.props.width/2 - padding/2;
    
    return (
    <div style={{
            position:'absolute',
            top:top,
            left:left,
            width:this.props.width,
            height:this.props.height,
            paddingTop:padding
        }}>
        {this.props.title}
        <ReactTable
            getProps={()=>{return {style:{background:'lightgrey'}}}}
            getTrProps={this.getTrProps.bind(this)}
            noDataText={this.props.noDataText}
            data={data}
            columns={columns} 
            defaultPageSize={5}
            pageSizeOptions = {[5, 10, 15]}
        />
    </div>  
    );
  }
}

export default TaskList;
