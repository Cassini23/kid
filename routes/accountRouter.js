var router = require('express').Router();
var Account = require('../model/account');
var SMSAuth = require('../model/SMSAuthenticate');
var passport = require('passport');


var email   = require('emailjs/email');

var server  = email.server.connect({
    user:    "kiddyserver",
    password:"ks_2015_01",
    host:    "smtp.mail.yahoo.com",
    ssl:     true
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}


router.get('/',function(req, res){
    console.log('In get function');
});

router.post('/validatePhone',function(req, res){

    var phoneMail = req.body.phone+'@txt.'+req.body.carrier+'.net';
    req.body.passcode = guid();

    var msgOptions = {
        text:    "This is your passcode "+req.body.passcode,
        from:    "<kiddyserver@yahoo.com>",
        to:      phoneMail,
        subject: "Hi "+req.body.username
    };
    server.send( msgOptions, function(err, message) { console.log(err || message); });
    new SMSAuth(req.body).save(function(err, results){
            if(err) res.status(500).json(err);
            else {

                res.status(200).json(results);
                console.log(results)
            }
    });

});

router.post('/register', function(req, res, next){
     console.log('In the post method');
     console.log(req.body);
    var pwd = req.body.password;
    delete req.body.password;


    SMSAuth.findOne({email: req.body.email, passcode: req.body.code}, function(err, results){
        if(err) res.status(500).json(err);
        else{
            Account.register(new Account( req.body ), pwd , function(err) {
                if (err) {
                    console.log('error while user register!', err);
                    return next(err);
                }

                console.log('user registered!');
                //res.send({'msg':'user registered!'});
                /*Account.register(new Account({ username: req.body.username }), req.body.password,function(err, results) {
                 if (err)if(err) res.status(500).json(err);
                 else res.status(200).json({'msg':'User created!'});
                 });*/
            });
            res.status(200).json({msg: req.body.username});
        }
    });



});


router.post('/login', passport.authenticate('local'), function(req, res) {
    if(!req.user) console.log('Unsuccessful login');
    else res.send({'msg':'Hello '+req.body.username});
});

module.exports = router;