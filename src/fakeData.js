import moment from 'moment'

export const subjects1 =  [
  			{
  				name:"Subject #1",
  				color:"blue",
  				assignments:[
  					{
  						name:"Assignment #1",
  						type:"Assignment",
  						dueDate:moment().add(3,'days'),
  					},{
  						name:"Assignment #2",
  						type:"Problem Set",
  						dueDate:moment().add(9,'days'),
  					},{
  						name:"Assignment #3",
  						type:"Assignment",
  						dueDate:moment().add(5,'days'),
  					},{
  						name:"Assignment #4",
  						type:"Problem Set",
  						dueDate:moment().add(8,'days'),
  					},{
  						name:"Assignment #5",
  						type:"Assignment",
  						dueDate:moment().add(1,'seconds'),
  					},{
  						name:"Assignment #6",
  						type:"Reading",
  						dueDate:moment().add(10,'days').add(5,'hours'),
  					},{
  						name:"Assignment #7",
  						type:"Assignment",
  						dueDate:moment().add(13,'days').subtract(3,'hours'),
  					},{
  						name:"Assignment #8",
  						type:"Assignment",
  						dueDate:moment().add(4,'days').subtract(1,'hours'),
  					}
  				]
  			},{
  				name:"Subject #2",
  				color:"violet",
  				assignments:[
  					{
  						name:"Assignment #1",
  						type:"Assignment",
  						dueDate:moment().add(7,'days')
  					},{
  						name:"Assignment #2",
  						type:"Exam",
  						dueDate:moment().add(4,'days')
  					},{
  						name:"Assignment #3",
  						type:"Assignment",
  						dueDate:moment().add(13,'days').add(12,'hours')
  					},{
  						name:"Assignment #4",
  						type:"Assignment",
  						dueDate:moment().add(3,'days').add(20,'hours')
  					},{
  						name:"Assignment #5",
  						type:"Assignment",
  						dueDate:moment().add(1,'seconds'),
  					}
  				]
  			},{
  				name:"Subject #3",
  				color:"orange",
  				assignments:[
  					{
  						name:"Assignment #1",
  						type:"Assignment",
  						dueDate:moment().add(5,'days'),
  					},{
  						name:"Assignment #2",
  						type:"Problem Set",
  						dueDate:moment().add(4,'days')
  					},{
  						name:"Assignment #3",
  						type:"Exam",
  						dueDate:moment().add(8,'days').add(12,'hours')
  					},{
  						name:"Assignment #4",
  						type:"Assignment",
  						dueDate:moment().add(4,'days')
  					},{
  						name:"Assignment #5",
  						type:"Assignment",
  						dueDate:moment().add(13,'days').add(12,'hours')
  					},{
  						name:"Assignment #6",
  						type:"Assignment",
  						dueDate:moment().add(1,'seconds'),
  					}

  				]
  			}, {
  				name:"Subject #4",
  				color:"purple",
  				assignments:[
  					{
  						name:"Assignment #1",
  						type:"Assignment",
  						dueDate:moment().add(6,'days'),
  					},{
  						name:"Assignment #2",
  						type:"Reading",
  						dueDate:moment().add(9,'days'),
  					},{
  						name:"Assignment #3",
  						type:"Assignment",
  						dueDate:moment().add(2,'days').subtract(1,'hours'),
  					},{
  						name:"Assignment #4",
  						type:"Assignment",
  						dueDate:moment().add(1,'days').add(4,'hours'),
  					},{
  						name:"Assignment #5",
  						type:"Assignment",
  						dueDate:moment().add(12,'days').add(9,'hours'),
  					},{
  						name:"Assignment #6",
  						type:"Assignment",
  						dueDate:moment().add(5,'days').add(4,'hours'),
  					},{
  						name:"Assignment #7",
  						type:"Assignment",
  						dueDate:moment().add(4,'days').add(9,'hours'),
  					},{
  						name:"Assignment #8",
  						type:"Assignment",
  						dueDate:moment().add(11,'days').add(4,'hours'),
  					},{
  						name:"Assignment #9",
  						type:"Exam",
  						dueDate:moment().add(3,'days').add(9,'hours'),
  					},{
  						name:"Assignment #10",
  						type:"Assignment",
  						dueDate:moment().add(1,'seconds'),
  					}
  				]
  			},{
  				name:"Subject #5",
  				color:"darkgreen",
  				assignments:[
  					{
  						name:"Assignment #1",
  						type:"Reading",
  						dueDate:moment().add(2,'days'),
  					},{
  						name:"Assignment #2",
  						type:"Assignment",
  						dueDate:moment().add(8,'days'),
  					},{
  						name:"Assignment #3",
  						type:"Essay",
  						dueDate:moment().add(2,'days').subtract(1,'hours'),
  					},{
  						name:"Assignment #4",
  						type:"Assignment",
  						dueDate:moment().add(11,'days').add(4,'hours'),
  					},{
  						name:"Assignment #5",
  						type:"Reading",
  						dueDate:moment().add(5,'days').add(3,'hours'),
  					},{
  						name:"Assignment #6",
  						type:"Assignment",
  						dueDate:moment().add(10,'days').add(4,'hours'),
  					},{
  						name:"Assignment #7",
  						type:"Reading",
  						dueDate:moment().add(6,'days').add(9,'hours'),
  					},{
  						name:"Assignment #8",
  						type:"Assignment",
  						dueDate:moment().add(12,'days').add(4,'hours'),
  					},{
  						name:"Assignment #9",
  						type:"Exam",
  						dueDate:moment().add(6,'days').add(9,'hours'),
  					},{
  						name:"Assignment #10",
  						type:"Assignment",
  						dueDate:moment().add(7,'days').subtract(30,'minutes'),
  					},{
  						name:"Assignment #11",
  						type:"Assignment",
  						dueDate:moment().add(1,'seconds'),
  					}
  				]
  			}
  	];

export const colors1 = {
	typeColors:{
		assignment:'white',
		exam:'maroon',
		reading:'cyan',
		problemset:'magenta'
	}
}

export default {
    subjects: subjects1,
    colors: colors1
};