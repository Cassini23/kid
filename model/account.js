/*Model*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    phone: String,
    address: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);