var express = require('express');
var router = express.Router();
var Subject = require('../models/Subject');

router.get('/:id?',function(req,res,next){
    Subject.getSubjectById(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
    
 });

router.post('/',function(req,res,next){
    Subject.addSubject(req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(req.body);//or return rows for 1 &amp;amp;amp; 0
        }
    });
});

router.delete('/:id',function(req,res,next){
    Subject.deleteSubject(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});
module.exports=router;