//zaladowanie mongoose'a
var mongoose = require('mongoose');

//defincija schematu modelu
var userBetSchema = mongoose.Schema({
    userId: String,
    betId: String,
    option: Number,
    bid: Number
});


// create the model for users and expose it to our app
module.exports = mongoose.model('UserBet', userBetSchema);
