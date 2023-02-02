const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    id: {
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('users', userSchema);  