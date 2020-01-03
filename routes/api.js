const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');


//get a list of ninjas from the db
router.get('/ninjas',(req,res,next)=>{
    Ninja.geoNear(
         {type:'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(ninjas){
        res.send(ninjas);
    });
});


//add a new ninja to the database
router.post('/ninjas',(req,res,next)=>{
    // var ninja =new Ninja(req.body);
    // ninja.save(); or
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
    
});


//Update a ninja in the database
router.put('/ninjas/:id',(req,res,next)=>{
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        Ninja.findOne({_id: req.params.id}).then((ninja)=>{
            res.send(ninja);
        });
        
    });
   
});
//delete a ninja from the database
router.delete('/ninjas/:id',(req,res,next)=>{
    Ninja.findByIdAndRemove({_id: req.params.id}).then((ninja)=>{
        res.send(ninja);
    })
    
});

module.exports = router;