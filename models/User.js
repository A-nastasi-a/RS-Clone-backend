const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Rple'}]
});

module.exports = mongoose.model("User", User);