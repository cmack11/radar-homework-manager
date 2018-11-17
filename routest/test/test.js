/*
// 
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
*/

let db = require("../dbconnection");
//let User = require('../models/User');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

var url = 'http://radar.shao11.com:4396';   // backend api address
var test = "abcde";							// default password
var id = 0;									// id
var all;									// all subjects and assignments temp

chai.use(chaiHttp);

// tests for Users
describe('Users', () => {
	// Test the /Post route
	describe('/Post User', () => {
		it('Should POST a user', (done) => {
			chai.request(url)
			.post('/RadarUsers/register')
			.send({name: "Steven Choi", email: "jyoon1297@gmail.com", pass: test})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('success');
				done();
			});
		})
	})

	describe('/Post two users with same email', () => {
		it('The second Post should fail', (done) => {
			chai.request(url)
			.post('/RadarUsers/register')
			.send({name: "Steven Choi", email: "jyoon1297@gmail.com", pass: test})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			});
		})
	})

	describe('/Post User login with incorrect password', () => {
		it('user should not be authenticated', (done) => {
			chai.request(url)
			.post('/RadarUsers/login')
			.send({user: "jyoon1297@gmail.com", pass: 'test'})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			})
		})
	})

	describe('/Post User login with correct password', () => {
		it('user should be authenticated', (done) => {
			chai.request(url)
			.post('/RadarUsers/login')
			.send({user: "jyoon1297@gmail.com", pass: test})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				// console.log(res);
				// interesting
				//console.log(typeof(res.body[0].User_id));
				id = res.body[0].user_id;
				id.should.be.a('number');
				done();
			})
		})
	})

	describe('Get name by id', () => {
		it('Should get a name associated with the id', (done) => {
			chai.request(url)
			.get('/RadarUsers/getName/' + id)
			.end((err, res) => {
				res.should.have.status(200);
				//console.log(res);
				res.body.should.be.an('array');
				res.body[0].name.should.be.a('string');
				res.body[0].name.should.eql('Steven Choi');
				done();
			})
		})
	})

	describe('Get name by bad id', () => {
		it('Should fail', (done) => {
			chai.request(url)
			.get('/RadarUsers/getName/9999999')
			.end((err, res) => {
				res.should.have.status(200);
				//console.log(res);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			})
		})
	})

	// after all User tests, delete test users
	before((done) => {
		db.query("DELETE FROM User WHERE password = 'abcde';");
		done();
	});
})

// Test for Subjects
describe('Subjects and Assignments', () => {
	describe('/Post Add Subject', () => {
		it('Should POST a subject', (done) => {
			chai.request(url)
			.post('/Subjects/addSubject')
			.send({name: "Math 240", color: "red", type: "assignment", user_id: 68})
			.end((err, res) => {
				res.should.have.status(200);
				res.text.should.be.a('string');	// need to implement harder next time
				done();
			});
		})
	})

	describe('/Post Subject with bad id', () => {
		it('Should not POST a subject', (done) => {
			chai.request(url)
			.post('/Subjects/addSubject')
			.send({name: "Math 240", color: "red", type: "assignment", user_id: 999999})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			});
		})
	})

	describe('/Post Update Subject', () => {
		it('Should update a subject', (done) => {
			chai.request(url)
			.post('/Subjects/updateSubjectName')
			.send({name: "CS350", subject_id: 39})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('success');
				done();
			});
		})
	})

	describe('/Post Update Subject twice for testing purpose', () => {
		it('Should update a subject', (done) => {
			chai.request(url)
			.post('/Subjects/updateSubjectName')
			.send({name: "CS340", subject_id: 39})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('success');
				done();
			});
		})
	})

	describe('/Post Update Subject with bad subject_id', () => {
		it('Should not POST a subject', (done) => {
			chai.request(url)
			.post('/Subjects/updateSubjectName')
			.send({name: "Math 340", subject_id: -1})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			});
		})
	})

	describe('/Post Add assignment', () => {
		it('Should POST an assignment', (done) => {
			chai.request(url)
			.post('/Tasks/addA')
			.send({name: "hw1", desciption: "kill me", type: "assignment", dueDate: "2018-11-30 00:00:01", subject_id: 39})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.be.a('string'); // need to implement harder test next time
				done();
			});
		})
	})

	describe('/Post Add assignment with invalid subject id', () => {
		it('Should not POST an assignment', (done) => {
			chai.request(url)
			.post('/Tasks/addA')
			.send({name: "hw1", desciption: "kill me", type: "assignment", dueDate: "2018-11-30 00:00:01", subject_id: -1})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			});
		})
	})

	describe('/Post Update Assignment', () => {
		it('Should POST a assignment', (done) => {
			chai.request(url)
			.post('/Tasks/updateA')
			.send({name: "Test2", desciption: "test2", type: "test2", dueDate: "2019-01-02 00:00:01", progress: null, date_complete: null, task_id: 36})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('success');
				done();
			});
		})
	})

	describe('/Post Update Assignment with bad id', () => {
		it('Should not POST a assignment', (done) => {
			chai.request(url)
			.post('/Tasks/updateA')
			.send({name: "Test2", desciption: "test2", type: "test2", dueDate: "2019-01-02 00:00:01", progress: null, date_complete: null, task_id: -1})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			});
		})
	})

	describe('/Get All Subjects and Tasks', () => {
		it('Should get all subjects from that User', (done) => {
			chai.request(url)
			.get('/Subjects/getAll/68')
			//.send({name: "Math 240", color: "red", type: "assignment", user_id: 999999})
			.end((err, res) => {
				res.should.have.status(200);
				//console.log(res);
				all = res.body;
				res.body.should.be.a('array');
				for(i = 0; i < res.body.length; i++) {
					res.body[i].subject_id.should.be.a('number');
					for(j = 0; j < res.body[i].assignments.length; j++) {
						res.body[i].assignments[j].task_id.should.be.a('number');
					}
				}
				done();
			});
		})
	})

	describe('/Get All Subjects and Tasks with bad id', () => {
		it('Should not get anything', (done) => {
			chai.request(url)
			.get('/Subjects/getAll/-1')
			//.send({name: "Math 240", color: "red", type: "assignment", user_id: 999999})
			.end((err, res) => {
				res.should.have.status(200);
				//console.log(res);
				res.body.should.be.an('array');
				res.body.should.have.length(0);
				done();
			});
		})
	})

	describe('/Delete the Task', () => {
		it('Should delete the task', (done) => {
			//console.log(all);
			for(i = 0; i < all.length; i++) {
				if(all[i].name == 'Math 340') {
					all[i].assignments.should.have.length(1);
					all[i].assignments[0].name.should.eql('hw1');
					id = all[i].assignments[0].task_id;
				}
			}
			//console.log(id);
			chai.request(url)
			.delete('/Tasks/deleteTask/' + id)
			//.send({name: "Math 340", subject_id: id})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				//res.text.should.eql('success');
			});
			chai.request(url)
			.get('/Subjects/getAll/68')
			//.send({name: "Math 240", color: "red", type: "assignment", user_id: 999999})
			.end((err, res) => {
				//console.log(res);
				res.should.have.status(200);
				// buffer the get all
				all = res.body;
				res.body.should.be.an('array')
				res.body[0].name.should.be.a('string');
				for(i = 0; i < all.length; i++) {
					if(res.body[i].name == 'Math 340') {
						res.body[i].assignments.should.have.length(0);
					}
				}
				done();
			});
		})
	})

	describe('/Delete the Task with invalid id', () => {
		it('Should not not delete a task', (done) => {
			chai.request(url)
			.delete('/Tasks/deleteTask/-1')
			//.send({name: "Math 340", subject_id: id})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			});
		})
	})

	describe('/Delete the Subject', () => {
		it('Should delete the Subject', (done) => {
			for(i = 0; i < all.length; i++) {
				if(all[i].name == 'Math 240') {
					id = all[i].subject_id;
				}
			}
			//console.log(id);
			chai.request(url)
			.delete('/Subjects/deleteSubject/' + id)
			//.send({name: "Math 340", subject_id: id})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				//res.text.should.eql('success');
			});
			chai.request(url)
			.get('/Subjects/getAll/68')
			//.send({name: "Math 240", color: "red", type: "assignment", user_id: 999999})
			.end((err, res) => {
				res.should.have.status(200);
				//console.log(res);
				res.body.should.have.length(1);
				res.body[0].name.should.be.a('string');
				done();
			});
		})
	})

	describe('/Delete the Subject with invalid id', () => {
		it('Should not not delete a subject', (done) => {
			chai.request(url)
			.delete('/Subjects/deleteSubject/-1')
			//.send({name: "Math 340", subject_id: id})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			});
		})
	})

	before((done) => {
		db.query("DELETE FROM Subject WHERE user_id = 68 AND name = 'Math 240';");
		db.query("DELETE FROM Task WHERE subject_id = 39 AND name = 'hw1';");
		done();
	})
})


describe('View Overdue and Complete Tasks', () => {
	/*
	before((done) => {
		db.query("INSERT INTO Task VALUES (DEFAULT, 'overdue', 'overdue', 'over','2014-01-01 00:00:01', NULL, NULL, 39, 0);");
		db.query("INSERT INTO Task VALUES (DEFAULT, 'overdue2', 'overdue2', 'over','2014-01-01 00:00:01', NULL, NULL, 39, 0);")
		done();
	})
	*/

	describe('/Get all overdue Tasks', () => {
		it('Should get all overdue tasks', (done) => {
			chai.request(url)
			.get('/Tasks/getOverdueTasks/68')
			//.send({name: "Math 340", subject_id: id})
			.end((err, res) => {
				res.should.have.status(200);
				//console.log(res);
				res.body.should.be.a('array');
				res.body.should.have.length(2);
				done();
			});
		})
	})

	describe('/Get all overdue Tasks', () => {
		it('Should get all overdue tasks', (done) => {
			chai.request(url)
			.get('/Tasks/getOverdueTasks/-1')
			//.send({name: "Math 340", subject_id: id})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.should.have.length(0);
				done();
			});
		})
	})

	describe('/Post set Task complete', () => {
		it('Should set task complete', (done) => {
			chai.request(url)
			.post('/Tasks/setCompleted/')
			.send({task_id: 93})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('success');
				done();
			});
		})
	})	

	describe('/Post set Task complete with invalid id', () => {
		it('Should not set task complete', (done) => {
			chai.request(url)
			.post('/Tasks/setCompleted/')
			.send({task_id: -1})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.text.should.eql('failed');
				done();
			});
		})
	})	

	describe('/Post view all completed Tasks', () => {
		it('Should view all tasks that are completed', (done) => {
			chai.request(url)
			.get('/Tasks/viewCompletedTasks/68')
			//.send({task_id: -1})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.should.have.length(1);
				done();
			});
		})
	})	

	describe('/Post view all completed Tasks with invalid user_id', () => {
		it('Should return empty', (done) => {
			chai.request(url)
			.get('/Tasks/viewCompletedTasks/-1')
			//.send({task_id: -1})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.should.have.length(0);
				done();
			});
		})
	})	

	after((done)=>{
		db.query("UPDATE Task SET completed = 0 WHERE completed = 1 AND type = 'over' AND subject_id = 39;");
		done();
	})
})
