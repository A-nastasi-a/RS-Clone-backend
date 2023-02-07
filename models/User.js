const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    name: {type: String},
    description: {type: String},
    tables: [{type: String, ref: "Table"}],
    cards: [{type: String, ref: "Card"}]
});

module.exports = mongoose.model("User", User);