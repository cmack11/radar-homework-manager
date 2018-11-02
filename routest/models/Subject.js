var db=require('../dbconnection'); //reference of dbconnection.js
 
var Subject={
 
    getAllSubjects:function(callback){ 
        return db.query("SELECT * FROM Subject",callback);
    },
    getSubjectById:function(id,callback){
    	return db.query("SELECT * FROM Subject WHERE Subject_id=?",[id],callback);
    },
    addSubject:function(Subject,callback){
    	return db.query("INSERT INTO Subject VALUES(?,?,?,?)",[Subject.Subject_id,Subject.Name,Subject.Email,Subject.Password, Subject.Create_time],callback);
    },
    deleteSubject:function(id,callback){
    	return db.query("DELETE FROM Subject WHERE Subject_id=?",[id],callback);
    },
    updateSubject:function(id,Subject,callback){
    	return db.query("UPDATE Subject SET Name=?,Email=?,Password=? WHERE Id=?",[Subject.Title,Subject.Status,id],callback);
    } 
};
module.exports=Subject;