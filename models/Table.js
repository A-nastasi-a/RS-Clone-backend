const mongoose = require('mongoose');

const Table = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    cards: [{type: String, ref: 'Card'}],
    date: Date,
    imageURL: String,
    creator: {type: String, ref: 'User'},
    members: [{type: String, ref: 'User'}],
    columns: [{type: String}]
});

module.exports = mongoose.model("Table", Table);