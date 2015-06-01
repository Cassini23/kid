var router = require('express').Router();
var Account = require('../model/account');
var passport = require('passport');


var email   = require('emailjs/email');
var server  = email.server.connect({
    user:    "kiddyserver",
    password:"ks_2015_01",
    host:    "smtp.mail.yahoo.com",
    ssl:     true
});

function getUUID(){
    'xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

// send the message and get a callback with an error or details of the message that was sent
/*server.send({
    text:    "getUUID()",
    from:    "<kiddyserver@yahoo.com>",
    to:      "<nina2308@gmail.com>",
    subject: "Phone verification"
}, function(err, message) { console.log(err || message); });
*/

router.get('/',function(req, res){
    console.log('In get function');
});

router.post('/register', function(req, res, next){
     console.log('In the post method');
     console.log(req.body);
    var message = getUUID();
        var msgOptions = {
            text:    message,
            from:    "<kiddyserver@yahoo.com>",
            to:      "someone <someone@your-email.com>",
            subject: "Phone verification"
        };

    var pwd = req.body.password;
    delete req.body.password;
    Account.register(new Account( req.body ), pwd , function(err) {
        if (err) {
            console.log('error while user register!', err);
            return next(err);
        }

        console.log('user registered!');
        res.send({'msg':'user registered!'});
        /*Account.register(new Account({ username: req.body.username }), req.body.password,function(err, results) {
         if (err)if(err) res.status(500).json(err);
         else res.status(200).json({'msg':'User created!'});
         });*/
    });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
    //if(!req.user)
    res.send({'msg':'Hello '+req.body.username});
});

module.exports = router;