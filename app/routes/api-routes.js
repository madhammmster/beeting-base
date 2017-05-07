var passportHelper = require('../helpers/passport-helper');
var express = require('express')
var router = express.Router()
// models
var User = require('../models/user'); 
var Bet = require('../models/bet'); 
var UserBet = require('../models/user-bet'); 


module.exports = function (app, passport) {

// 
// USERS
// 

// define the home page route
router.get('/users', function (req, res) {
  
  User.find({}, function(err, users) {
    res.send(users);  
  });
})
// define the about route
router.get('/users/:id', function (req, res) {
    
  User.find({_id: req.params.id}, function(err, user) {
    
    res.send(user[0]);  
  });

})
// 
// USER-BETS
//
router.get('/user-bets', function(req, res){
    
    
    UserBet.find({userId: req.user._id}, function(err, userBets) {
        res.send(userBets);  
    });
}) 

// 
// BETS
//
router.get('/bets', function(req, res){    
    Bet.find({}, function(err, users) {
        res.send(users);  
    });
}) 

router.post('/bets', function(req, res){
    var bet = {
        betName: req.body['bet-name'],
        createDate: new Date(),
        expirationDate: req.body['expiration-date'],
        status: 'active',        
        option1: {            
            name: req.body['option1-name'],
            probability: req.body['option1-probability'],
            numberOfBets: 0
        },
        option2: {            
            name: req.body['option2-name'],
            probability: req.body['option2-probability'],
            numberOfBets: 0
        }
    }

    Bet.save(bet, function(err){
        if(err) return res.json(err);

        return res.json(bet);
    })
})

router.post('/bet-on', function(req, res){
    
    var bet = {
        betId: req.body['bet-id'],
        bid: req.body['bet-bid'],
        option: req.body['bet-option'],
        userId: req.user._id
    };
    
    console.log(bet);

    var userBet = new UserBet(bet);
    userBet.save(function(err){
        if(err) return res.json(err);
        
        res.json(userBet);
    })



})


app.use('/api', router);


}