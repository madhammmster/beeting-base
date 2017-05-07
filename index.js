// instacja expressa
var express = require('express');
var app = express();

//mongoose i passport
var mongoose = require('mongoose');
var passport = require('passport');

//logger
var morgan = require('morgan');

// helper do zwracania krotkich wiadomosci do uzytkownika 
var flash = require('connect-flash');

//parsowanie request'ow i response'ow
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//mechanizm sesji - express
var session = require('express-session');

//
//konfiguracja bazy danych
var configDB = require('./config/database.js');
//polaczenie mongoose'a z baza danych
mongoose.connect(configDB.url);

//zmienna pomocnicza dla glownego folderu oraz folderow widoku
var path = require('path');
app.appDir = path.dirname(require.main.filename);
app.viewsDir =path.join(app.appDir, '/views');

//ustawienie folderu dla plikow publicznych i statycznych
app.use('/dist', express.static(path.join(__dirname, 'dist')));
//
//przekazanie biblioteki passport do pliku konfiguracyjnego i zainicjowanie wszystkich strategii logowania i rejestracji
require('./config/passport')(passport);

//konfiguracja z jakich skladowych ma korzystac aplikacja express

app.use(morgan('dev')); //logger wyswietlajacy wszystkie zapytania na konsoli
app.use(cookieParser()); //parser odczytujacy ciasteczka z request'ow
app.use(bodyParser.json()); //parser wyluskujacy dane z requsetow (html forms)
app.use(bodyParser.urlencoded({ extended: true })); // parser wyluskujacy zmienne z url'i request'ow


var sessionConfiguration = {
    secret: 'beetingbase', // session secret
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionConfiguration)); //inicjaca mechanizimu sesji dla express potrzebnego dla passport

app.use(passport.initialize()); //inicjacja biblioteki passport i przekaznie jej do express'a
app.use(passport.session()); // przekazanie passportowego mechanizmu sessji ktory trwale przechowuje informacje o zalogowanych uzytkownikach
app.use(flash()); // wyswietlanie informacji zwrotnych do uzytkownika 

// routing aplikacji 
require('./app/routes/api-routes.js')(app, passport); //route API
require('./app/routes/routes.js')(app, passport); // przekazanie apliakcji express i passport'a do dalszej obslugi przez routing 




// app.get('*',function (req, res) {
//         res.redirect('/app');
//     });

var port = 8080;
//uruchomienie aplikacji/serwera express
app.listen(port, function(){
    console.log('aplikacja zostala uruchomiona na porcie: ' + port);
});

