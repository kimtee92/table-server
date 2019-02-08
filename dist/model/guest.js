"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uri = 'mongodb://dbguest:NSN9mGkU0jfQUFDs@cluster0-shard-00-00-at0kr.mongodb.net:27017,cluster0-shard-00-01-at0kr.mongodb.net:27017,cluster0-shard-00-02-at0kr.mongodb.net:27017/guestbook?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(uri, function (err) {
    if (err) {
        console.log("not connected" + err.message);
    }
    else {
        console.log("Succesfully Connected!");
    }
});
exports.GuestSchema = new Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Address: { type: String, required: true },
    Date: { type: String, required: true }
});
exports.GuestSchema.set('toJSON', { virtuals: true });
var Guest = mongoose.model('Guest', exports.GuestSchema);
exports.default = Guest;
