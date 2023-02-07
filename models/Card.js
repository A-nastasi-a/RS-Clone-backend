const mongoose = require('mongoose');

const Card = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    table: {type: String, ref: 'Table', required: true},
    column: {type: String, required: true},
    comments: [{type: String}],
    users: [{type: String, ref: 'User'}],
    creator: {type: String, ref: 'User'},
});

module.exports = mongoose.model("Card", Card);