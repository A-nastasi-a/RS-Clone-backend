const mongoose = require('mongoose');

const Table = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
    date: Date,
    imageURL: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    columns: [{type: String}]
});

module.exports = mongoose.model("Table", Table);