import moment from 'moment'

export const subjects2 = [];
export const subjects1 = [
  			{
  				name:"Subject #1",
  				color:"blue",
  				assignments:[
  					{
  						name:"S1A1",
  						type_id:1,
  						dueDate:moment().add(3,'days'),
  						subject:"Subject #1",
  					},{
  						name:"S1PS2",
  						type_id:4,
  						dueDate:moment().add(9,'days'),
						subject:"Subject #1",
  					},{
  						name:"S1A3",
  						type_id:1,
  						dueDate:moment().add(5,'days'),
						subject:"Subject #1",
  					},{
  						name:"S1PS4",
  						type_id:4,
  						dueDate:moment().add(8,'days'),
						subject:"Subject #1",
  					},{
  						name:"S1A5",
  						type_id:1,
  						dueDate:moment().add(1,'seconds'),
						subject:"Subject #1",
  					},{
  						name:"S1R6",
  						type_id:3,
  						dueDate:moment().add(10,'days').add(5,'hours'),
						subject:"Subject #1",
  					},{
  						name:"S1A7",
  						type_id:1,
  						dueDate:moment().add(13,'days').subtract(3,'hours'),
						subject:"Subject #1",
  					},{
  						name:"S1A8",
  						type_id:1,
  						dueDate:moment().add(4,'days').subtract(1,'hours'),
						subject:"Subject #1",
  					}
  				]
  			},{
  				name:"Subject #2",
  				color:"violet",
  				assignments:[
  					{
  						name:"S2A1",
  						type_id:1,
  						dueDate:moment().add(7,'days'),
						subject:"Subject #2",
  					},{
  						name:"S2E2",
  						type_id:2,
  						dueDate:moment().add(4,'days'),
						subject:"Subject #2",
  					},{
  						name:"S2A3",
  						type_id:1,
  						dueDate:moment().add(13,'days').add(12,'hours'),
						subject:"Subject #2",
  					},{
  						name:"S2A4",
  						type_id:1,
  						dueDate:moment().add(3,'days').add(20,'hours'),
						subject:"Subject #2",
  					},{
  						name:"S2A5",
  						type_id:1,
  						dueDate:moment().add(1,'seconds'),
						  subject:"Subject #2",
  					}
  				]
  			},{
  				name:"Subject #3",
  				color:"orange",
  				assignments:[
  					{
  						name:"S3A1",
  						type_id:1,
  						dueDate:moment().add(5,'days'),
						subject:"Subject #3",
  					},{
  						name:"S3PS2",
  						type_id:4,
  						dueDate:moment().add(4,'days'),
						subject:"Subject #3",
  					},{
  						name:"S3E3",
  						type_id:2,
  						dueDate:moment().add(8,'days').add(12,'hours'),
						subject:"Subject #3",
  					},{
  						name:"S3A4",
  						type_id:1,
  						dueDate:moment().add(4,'days'),
						subject:"Subject #3",
  					},{
  						name:"S3A5",
  						type_id:1,
  						dueDate:moment().add(13,'days').add(12,'hours'),
						subject:"Subject #3",
  					},{
  						name:"S3A6",
  						type_id:1,
  						dueDate:moment().add(1,'seconds'),
						subject:"Subject #3",
  					}

  				]
  			}, {
  				name:"Subject #4",
  				color:"purple",
  				assignments:[
  					{
  						name:"S4A1",
  						type_id:1,
						dueDate:moment().add(6,'days'),
						subject:"Subject #4",
  					},{
  						name:"S4R2",
  						type_id:3,
  						dueDate:moment().add(9,'days'),
						subject:"Subject #4",
  					},{
  						name:"S4A3",
  						type_id:1,
  						dueDate:moment().add(2,'days').subtract(1,'hours'),
						subject:"Subject #4",
  					},{
  						name:"S4A4",
  						type_id:1,
  						dueDate:moment().add(1,'days').add(4,'hours'),
						subject:"Subject #4",
  					},{
  						name:"S4A5",
  						type_id:1,
  						dueDate:moment().add(12,'days').add(9,'hours'),
						subject:"Subject #4",
  					},{
  						name:"S4A6",
  						type_id:1,
  						dueDate:moment().add(5,'days').add(4,'hours'),
						subject:"Subject #4",
  					},{
  						name:"S4A7",
  						type_id:1,
  						dueDate:moment().add(4,'days').add(9,'hours'),
						subject:"Subject #4",
  					},{
  						name:"S4A8",
  						type_id:1,
  						dueDate:moment().add(11,'days').add(4,'hours'),
						subject:"Subject #4",
  					},{
  						name:"S4E9",
  						type_id:2,
  						dueDate:moment().add(3,'days').add(9,'hours'),
						subject:"Subject #4",
  					},{
  						name:"S4A10",
  						type_id:1,
  						dueDate:moment().add(1,'seconds'),
						subject:"Subject #4",
  					}
  				]
  			},{
  				name:"Subject #5",
  				color:"darkgreen",
  				assignments:[
  					{
  						name:"S5R1",
  						type_id:3,
  						dueDate:moment().add(2,'days'),
						subject:"Subject #5",
  					},{
  						name:"S5A2",
  						type_id:1,
  						dueDate:moment().add(8,'days'),
						subject:"Subject #5",
  					},{
  						name:"S5A3",
  						type_id:1,
  						dueDate:moment().add(2,'days').subtract(1,'hours'),
						subject:"Subject #5",
  					},{
  						name:"S5A4",
  						type_id:1,
  						dueDate:moment().add(11,'days').add(4,'hours'),
						subject:"Subject #5",
  					},{
  						name:"S5R5",
  						type_id:3,
  						dueDate:moment().add(5,'days').add(3,'hours'),
						subject:"Subject #5",
  					},{
  						name:"S5A6",
  						type_id:1,
  						dueDate:moment().add(10,'days').add(4,'hours'),
						subject:"Subject #5",
  					},{
  						name:"S5R7",
  						type_id:3,
  						dueDate:moment().add(6,'days').add(9,'hours'),
						subject:"Subject #5",
  					},{
  						name:"S5A8",
  						type_id:1,
  						dueDate:moment().add(12,'days').add(4,'hours'),
						subject:"Subject #5",
  					},{
  						name:"S5E9",
  						type_id:2,
  						dueDate:moment().add(6,'days').add(9,'hours'),
						subject:"Subject #5",
  					},{
  						name:"S5A10",
  						type_id:1,
  						dueDate:moment().add(7,'days').subtract(30,'minutes'),
						subject:"Subject #5",
  					},{
  						name:"S5A11",
  						type_id:1,
  						dueDate:moment().add(1,'seconds'),
						subject:"Subject #5",
  					}
  				]
  			}
  	];


    export const detailedSubjects = [
            {
              name:"History 211",
              color:"darkgreen",
              assignments:[
                {
                  name:"Chapters 3-5",
                  type_id:3,
                  dueDate:moment().add(2,'days').hours(12).minutes(55),
                  subject:"History 211",
                },{
                  name:"Chapters 5-7",
                  type_id:3,
                  dueDate:moment().add(9,'days').hours(12).minutes(55),
                  subject:"History 211",
                },{
                  name:"Chapters 7-10",
                  type_id:3,
                  dueDate:moment().add(16,'days').hours(12).minutes(55),
                  subject:"History 211",
                },{
                  name:"Reflection Essay",
                  type_id:1,
                  dueDate:moment().add(14,'days').hours(23).minutes(59),
                  subject:"History 211",
                },{
                  name:"Midterm #1",
                  type_id:2,
                  dueDate:moment().add(20,'days').hours(13).minutes(30),
                  subject:"History 211",
                }
              ]
            },{
              name:"Math 222",
              color:"red",
              assignments:[
                {
                  name:"Weekly Homework",
                  type_id:4,
                  dueDate:moment().add(3,'days').hours(23).minutes(59),
                  subject:"Math 222",
                },{
                  name:"Weekly Homework",
                  type_id:4,
                  dueDate:moment().add(10,'days').hours(23).minutes(59),
                  subject:"Math 222",
                },{
                  name:"Weekly Homework",
                  type_id:4,
                  dueDate:moment().add(17,'days').hours(23).minutes(59),
                  subject:"Math 222",
                },{
                  name:"Weekly Homework",
                  type_id:4,
                  dueDate:moment().add(24,'days').hours(23).minutes(59),
                  subject:"Math 222",
                },{
                  name:"In-Class Quiz",
                  type_id:2,
                  dueDate:moment().add(6,'days').hours(9).minutes(55),
                  subject:"Math 222",
                },{
                  name:"In-Class Quiz",
                  type_id:2,
                  dueDate:moment().add(20,'days').hours(9).minutes(55),
                  subject:"Math 222",
                },{
                  name:"Midterm 2",
                  type_id:2,
                  dueDate:moment().add(30,'days').hours(17).minutes(30),
                  subject:"Math 222",
                }
              ]
            },{
              name:"English 134",
              color:"gold",
              assignments:[
                {
                  name:"Chapters 10-15",
                  type_id:3,
                  dueDate:moment().add(1,'days').hours(13).minutes(5),
                  subject:"English 134",
                },{
                  name:"Chapters 15-20",
                  type_id:3,
                  dueDate:moment().add(4,'days').hours(13).minutes(5),
                  subject:"English 134",
                },{
                  name:"Chapters 20-26",
                  type_id:3,
                  dueDate:moment().add(8,'days').hours(13).minutes(5),
                  subject:"English 134",
                },{
                  name:"Chapters 26-End",
                  type_id:3,
                  dueDate:moment().add(11,'days').hours(13).minutes(5),
                  subject:"English 134",
                },{
                  name:"Reflection Essay Rough Draft",
                  type_id:1,
                  dueDate:moment().add(6,'days').hours(23).minutes(59),
                  subject:"English 134",
                },{
                  name:"Reflection Essay Final Draft",
                  type_id:1,
                  dueDate:moment().add(20,'days').hours(23).minutes(59),
                  subject:"English 134",
                },{
                  name:"Online Discussion Response",
                  type_id:1,
                  dueDate:moment().add(18,'days').hours(23).minutes(59),
                  subject:"English 134",
                }
              ]
            },{
              name:"CS 506",
              color:"navy",
              assignments:[
                {
                  name:"Requirements and Specifications",
                  type_id:1,
                  dueDate:moment().add(4,'days').hours(23).minutes(55),
                  subject:"CS 506",
                },{
                  name:"Design and Planning",
                  type_id:3,
                  dueDate:moment().add(11,'days').hours(23).minutes(55),
                  subject:"CS 506",
                },{
                  name:"GitHub Tutorial",
                  type_id:1,
                  dueDate:moment().add(9,'days').hours(23).minutes(55),
                  subject:"CS 506",
                },{
                  name:"Iteration #1",
                  type_id:1,
                  dueDate:moment().add(18,'days').hours(23).minutes(55),
                  subject:"CS 506",
                },{
                  name:"Midterm",
                  type_id:2,
                  dueDate:moment().add(22,'days').hours(17).minutes(30),
                  subject:"CS 506",
                },{
                  name:"Iteration #2",
                  type_id:1,
                  dueDate:moment().add(32,'days').hours(23).minutes(55),
                  subject:"CS 506",
                },{
                  name:"Final Presentation",
                  type_id:1,
                  dueDate:moment().add(46,'days').hours(23).minutes(55),
                  subject:"CS 506",
                }
              ]
            },{
              name:"Chemistry 158",
              color:"purple",
              assignments:[
                {
                  name:"Chapter 4",
                  type_id:3,
                  dueDate:moment().add(5,'days').hours(9).minutes(30),
                  subject:"Chemistry 158",
                },{
                  name:"Chapter 5",
                  type_id:3,
                  dueDate:moment().add(12,'days').hours(9).minutes(30),
                  subject:"Chemistry 158",
                },{
                  name:"Chapter 6",
                  type_id:3,
                  dueDate:moment().add(18,'days').hours(9).minutes(30),
                  subject:"Chemistry 158",
                },{
                  name:"Chapter 7",
                  type_id:3,
                  dueDate:moment().add(25,'days').hours(9).minutes(30),
                  subject:"Chemistry 158",
                },{
                  name:"Lab Report",
                  type_id:1,
                  dueDate:moment().add(6,'days').hours(23).minutes(59),
                  subject:"Chemistry 158",
                },{
                  name:"Covalent Bond Practice",
                  type_id:1,
                  dueDate:moment().add(20,'days').hours(23).minutes(59),
                  subject:"Chemistry 158",
                },{
                  name:"Midterm #1",
                  type_id:2,
                  dueDate:moment().add(10,'days').hours(5).minutes(30),
                  subject:"Chemistry 158",
                },{
                  name:"Midterm #2",
                  type_id:2,
                  dueDate:moment().add(25,'days').hours(5).minutes(30),
                  subject:"Chemistry 158",
                },{
                  name:"Final",
                  type_id:2,
                  dueDate:moment().add(40,'days').hours(5).minutes(30),
                  subject:"Chemistry 158",
                }
              ]
            }
        ];
export const subjects = detailedSubjects;

const types1 = [
  {type_id:1, name:'Assignment', color:'white'},
  {type_id:2, name:'Exam', color:'maroon'},
  {type_id:3, name:'Reading', color:'cyan'},
  {type_id:4, name:'Problem Set', color:'magenta'},
  {type_id:5, name:'Coding Practice', color:'lightgreen'},
]

export const typesExample = types1;

export const colors1 = {
	typeColors:{
	}
}
