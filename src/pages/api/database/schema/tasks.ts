import { Schema, model } from 'mongoose';

const schema = new Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    }
}, {
    timestamps: { createdAt: 'created_at' }
})

const tasks = model('Tasks', schema);

export default tasks;