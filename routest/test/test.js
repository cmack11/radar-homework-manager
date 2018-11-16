var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

// User

let db = require("../dbconnection");
//let User = require('../models/User');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

var url = 'http://radar.shao11.com:4396';
var test = "abcde";

chai.use(chaiHttp);

describe('Users', () => {
	// Test the /Post route
	describe('/Post User', () => {
		it('It should POST a user', (done) => {
			chai.request(url)
				.post('/RadarUsers/register')
				.send({name: "Steven Choi", email: "jyoon1297@gmail.com", pass: test})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					// TODO: what the response should be?
					//console.log(res);
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

	describe('/Post User login with correct password', () => {
		it('user should be authenticated', (done) => {
			chai.request(url)
				.post('/RadarUsers/login')
				.send({user: "jyoon1297@gmail.com", pass: test})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					//console.log(res);
					// interesting
					//console.log(typeof(res.body[0].User_id));
					res.body[0].User_id.should.be.a('number');
					done();
				})
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

	// after each test, delete test users
	after((done) => {
		db.query("DELETE FROM User WHERE Password = 'abcde';");
		done();
	});
})