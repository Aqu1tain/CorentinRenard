import { Schema, model } from 'mongoose';

export const skillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageid: {
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

export const Skill = model('Skill', skillSchema);
