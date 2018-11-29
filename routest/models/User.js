var db=require('../dbconnection'); //reference of dbconnection.js
 
var User={
 
    getAllUsers:function(callback){ 
        return db.query("SELECT * FROM User",callback);
    },
    getUserById:function(id,callback){
    	return db.query("SELECT * FROM User WHERE User_id=?",[id],callback);
    },
    // add for reset password
    getUserByEmail:function(email,callback){
        return db.query("SELECT * FROM User WHERE email = ?",[email],callback);
    }
    addUser:function(User,callback){
    	return db.query("INSERT INTO User VALUES(?,?,?,?)",[User.User_id,User.Name,User.Email,User.Password, User.Create_time],callback);
    },
    deleteUser:function(id,callback){
    	return db.query("DELETE FROM User WHERE User_id=?",[id],callback);
    },
    updateUser:function(id,User,callback){
    	return db.query("UPDATE User SET Name=?,Email=?,Password=? WHERE Id=?",[User.Title,User.Status,id],callback);
    },
    saveReset:function(id,email,token,expire,callback){
        return db.query("INSERT INTO Change_password VALUES(?,?,?,?)",[id,email,token,expire],callback);
    },
    getReset:function(token,callback){
        return db.query("SELECT * FROM Change_password WHERE reset_tolken = ?",[token],callback);
    }
};
module.exports=User;