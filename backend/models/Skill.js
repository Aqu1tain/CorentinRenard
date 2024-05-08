const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link : {
        type: String,
        required: true
    },
    level : {
        type: Number,
        required: true
    },
    work : {
        /* 'webdesign', 'frontend', 'backend' */
        type: String,
        enum: ['webdesign', 'frontend', 'backend'],
        required: true
    }
});

module.exports = mongoose.model('Skill', skillSchema)