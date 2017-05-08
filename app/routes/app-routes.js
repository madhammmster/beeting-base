var passportHelper = require('../helpers/passport-helper');
var express = require('express');
var router = express.Router();
var path = require('path');

module.exports = function (app, passport) {


    // profil uzytkownika
    router.get('/*', passportHelper.isLoggedIn, function (req, res) {
        res.sendfile(path.join(app.viewsDir, 'app.html'));
    });


    app.use('/app', router);


}
