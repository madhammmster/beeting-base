var mongoose = require('mongoose');

//defincija schematu modelu
var betSchema = mongoose.Schema({
   name: String,
   createDate: Date,
   expirationDate: Date,
   status: String, //active, expired, hot, 
   option1: {
    name: String,
    probability: Number,
    numberOfBets: Number
   },
   option2:{
    name: String,
    probability: Number,
    numberOfBets: Number
   }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Bet', betSchema);
