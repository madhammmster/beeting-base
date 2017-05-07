var passportHelper = require('../helpers/passport-helper');
var path = require('path');

module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.sendfile(path.join(app.viewsDir, 'index.html'));
    });

    // app.get('/', function (req, res) {        
    //     res.render('index.ejs');
    // });


    // profil uzytkownika
    // app.get('/app', passportHelper.isLoggedIn, function (req, res) {
    //     res.sendfile( path.join(app.viewsDir, 'app.html'));
    // });

    // // profil uzytkownika
    // app.get('/profile', passportHelper.isLoggedIn, function (req, res) {
    //     res.render('profile.ejs', {
    //         user: req.user
    //     });
    // });


    // wylogowanie
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });


    //authentication - uwierzytelnianie (pierwsze logowanie)

    //lokalna strategia
    //formularz logowania 
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    // procedura logowania po nacisnieciu przycisku
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', //przekierowanie do zabezpieczonej sekcji profile
        failureRedirect: '/login', // przekierowanie do formularza logowania
        failureFlash: true // wsywietl wiadomosc zwrotna
    }));

    //formularz rejestracji
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    // procedura rejestracji po nacisnieciu przycisku
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', //przekierowanie do zabezpieczonej sekcji profile
        failureRedirect: '/signup', // przekierowanie do formularza reejstracji
        failureFlash: true // allow flash messages
    }));

    //facebook strategia
    // wyslanie do facebooka zapytania 
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // obsluga funkcji callback po odpowiedzi ktora przyszla od facebooka
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    //authentication - uwierzytelnianie konta ktore zalogowane jest z wykrozystaniem innych strategii (sciezka /connect)
    // lokalna strategia
    app.get('/connect/local', function (req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', //przekierowanie do zabezpieczonej sekcji profile
        failureRedirect: '/connect/local',
        failureFlash: true
    }));

    // strategia facebooka

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/profile', //przekierowanie do zabezpieczonej sekcji profile
            failureRedirect: '/'
        }));


    app.get('*', passportHelper.isLoggedIn, function (req, res) {
        res.sendfile(path.join(app.viewsDir, 'app.html'));
    });
}
