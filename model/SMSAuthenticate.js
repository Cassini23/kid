var mongoose = require('mongoose');

var SMSModel = mongoose.model('smsModel', {
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },

    phone: {
        type: Number,
        unique: true
    },

    passcode: {
        type: String,
        unique: true
    }

});//this is will show as DB on contacts

module.exports = SMSModel;