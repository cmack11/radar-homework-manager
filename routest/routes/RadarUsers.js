var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/:id?',function(req,res,next){
    User.getUserById(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
    
 });

router.post('/',function(req,res,next){
    User.addUser(req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(req.body);//or return rows for 1 &amp;amp;amp; 0
        }
    });
});

router.delete('/:id',function(req,res,next){
    User.deleteUser(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});
module.exports=router;