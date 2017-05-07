// zaladuj wszystkie strategie logowania
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy  = require('passport-twitter').Strategy;
// var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

// zaladuj model user'a
var User = require('../app/models/user');

// plik konfiguracyjny dla strategii korzystajacych z Auth
var configAuth = require('./auth');

module.exports = function (passport) {

    //serializacja - zapisanie informacji o aktywnym uzytkowniku dla sesji
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // usuniecie informacji o zuykowniku dla sesji 
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // LOKALNA STRATEGIA
    //implementacja lokalnej strategii logowania (standardowe login i password)
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email', // standardowo logowanie wymaga pola "nazwa uzytkownika" tutaj przekazany jest email
        passwordField: 'password',
        passReqToCallback: true // pozwala przekazac request do dalszej funckji, dzieki czemu mozna skorzystac np z req.bodu.mojaZmienna
    },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase(); //zabezpieczenie przed podaniem wielkich liter w emailu

            //wykorzystanie obiektu nodejs process aby wykonac ponizszy kod asynchronicznie
            process.nextTick(function () {
                User.findOne({ 'local.email': email }, function (err, user) {
                    //jezeli wykonanie funkcji findOne na modelu User zwrocilo jakis blad to go zwroc
                    if (err)
                        return done(err);

                    // jezeli przekazany obiekt user jest null'em - nie znaleziono uzytkownika o takim emailu w bazie
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'Nie znaleziono uzytkownika o takim emailu.'));

                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Złe hasło.'));
                    // all is well, return user
                    else
                        return done(null, user);
                });
            });
        }));

    //
    //implementacja lokalnej strategii rejestracji (standardowe login i password)
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email', // standardowo logowanie wymaga pola "nazwa uzytkownika" tutaj przekazany jest email
        passwordField: 'password',
        passReqToCallback: true // pozwala przekazac request do dalszej funckji, dzieki czemu mozna skorzystac np z req.bodu.mojaZmienna
    },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase(); //zabezpieczenie przed podaniem wielkich liter w emailu

            //wykorzystanie obiektu nodejs process aby wykonac ponizszy kod asynchronicznie
            process.nextTick(function () {
                if (!req.user) { // jezeli w requset'cie nie znalezion zaserializowanego obiektu user'a

                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err) //jezeli wykonanie funkcji findOne na modelu User zwrocilo jakis blad to go zwroc
                            return done(err);

                        if (user) { // sprawdz czy obiekt user jest nullem. Jezeli nie jakis uzytkownik o podanym emailu juz istnieje 
                            return done(null, false, req.flash('signupMessage', 'Email jest juz zajety.'));
                        } else {
                            // Stworz uzytkownik o przekazanych danych i zapisz go w bazie
                            var newUser = new User();

                            newUser.local.email = email;
                            // newUser.local.password = newUser.generateHash(password);
                            newUser.local.password = password;
                            newUser.save(function (err) {
                                if (err)
                                    return done(err);
                                return done(null, newUser);
                            });
                        }
                    });

                } else if (!req.user.local.email) { // jezeli w requset'cie znaleziono zaserializowany obiekt user'a ale nie posiada lokalnego emaila (byl wczesniej zarejestrowany inna strategia)

                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err) //jezeli wykonanie funkcji findOne na modelu User zwrocilo jakis blad to go zwroc
                            return done(err);

                        if (user) { // sprawdz czy obiekt user jest nullem. Jezeli nie jakis uzytkownik o podanym emailu juz istnieje 
                            return done(null, false, req.flash('loginMessage', 'Email jest juz zajety przez innego uzytkownika.'));
                        } else {
                            //zaktualizuj inforamcje o uzytkowniku dodajac do jego konta lokalna strategie logowania 
                            var user = req.user;
                            user.local.email = email;
                            // user.local.password = user.generateHash(password);
                            user.local.password = password;
                            user.save(function (err) {
                                if (err)
                                    return done(err);
                                return done(null, user);
                            });
                        }
                    });

                } else { //jezeli uzytkownik jest juz zarejestrowany z wykorzystaniem lokalnej strategii
                    return done(null, req.user);
                }
            });

        }));


    //FACEBOOK STRATEGIA
    //pobranie informacji o strategii logowania dla facebooka z pliku konfiguracyjnego oauth
    var fbStrategySettings = configAuth.facebookAuth;
    fbStrategySettings.passReqToCallback = true;  // pozwala przekazac request do dalszej funckji, dzieki czemu mozna skorzystac np z req.bodu.mojaZmienna
    //inicjacja strategii facebook'owej
    passport.use(new FacebookStrategy(fbStrategySettings,
        function (req, token, refreshToken, profile, done) {
            //wykorzystanie obiektu nodejs process aby wykonac ponizszy kod asynchronicznie
            process.nextTick(function () {

                
                if (!req.user) { // sprawdzenie czy w request'cie nie przyszedl obiekt uzytkownika (czy nie jest obecnie zalogowany)

                    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) { //jezeli w bazie znaleziono uzytkownika z przypisanym id profilu facebook'a                            
                            if (!user.facebook.token) { //jezeli istnieje uzytkownik z takim przypisanym kontem facebook'owym ale nie posiada token'a
                                
                                user.facebook.token = token;
                                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                                user.save(function (err) {
                                    if (err)
                                        return done(err);
                                    return done(null, user);
                                });
                            }

                            return done(null, user); //uzytkonwik zostal znaleziony a jego obiekt przekazany do callback'a (done)
                        } else { // jezeli w bazie nie znaleziono uzytkownika z przypisanym id profilu facebook'a    
                            
                            var newUser = new User();

                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            newUser.save(function (err) {
                                if (err)
                                    return done(err);
                                return done(null, newUser);
                            });
                        }
                    });

                } else { //uzytkownik istnieje w bazie i jest zalogowany ale dodatkowo musi zostac polaczony z kontem facebook'owym
                    
                    var user = req.user; //pobierz uzytkownika z request'a

                    user.facebook.id = profile.id;
                    user.facebook.token = token;
                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                    user.save(function (err) {
                        if (err)
                            return done(err);
                        return done(null, user);
                    });

                }
            });

        }));

}