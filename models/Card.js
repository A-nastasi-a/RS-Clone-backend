const mongoose = require('mongoose');

const Card = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    table: {type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true},
    column: {type: String, required: true},
    comments: [{type: String}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

module.exports = mongoose.model("Card", Card);