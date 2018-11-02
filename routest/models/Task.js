var db=require('../dbconnection'); //reference of dbconnection.js
 
var Task={
 
    getAllTasks:function(callback){ 
        return db.query("SELECT * FROM Task",callback);
    },
    getTaskById:function(id,callback){
    	return db.query("SELECT * FROM Task where Task_id=?",[id],callback);
    },
    addTask:function(Task,callback){
    	return db.query("INSERT INTO Task VALUES(?,?,?,?,?,?,?,?)",[Task.Task_id,Task.Name,Task.Description,Task.Type,Task.Deadline,Task.Progress,Task.Date_completed,Task.Subject_id],callback);
    },
    deleteTask:function(id,callback){
    	return db.query("DELETE FROM Task WHERE Id=?",[id],callback);
    },
    updateTask:function(id,Task,callback){
    	return db.query("UPDATE TASK SET Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
    } 
};
module.exports=Task;