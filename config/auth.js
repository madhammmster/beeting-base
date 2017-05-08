
// dostarzenie obiektu zawierajacego informacje potrzebne do wykorzystania logowania przez auth dla konkretnych strategii
module.exports = {

    'facebookAuth' : {
        'clientID'        : '431464123871993', // your App ID
        'clientSecret'    : '5a5133f9b6ffa1ad1984bf3805d3d899', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here',
        'clientSecret'     : 'your-client-secret-here',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
