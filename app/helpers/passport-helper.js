

module.exports = {

    // funkcja spradzajaca czy uzytkownik jest zalogowany
    isLoggedIn : function (req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }

}