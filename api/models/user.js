let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username:{
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('user', UserSchema);