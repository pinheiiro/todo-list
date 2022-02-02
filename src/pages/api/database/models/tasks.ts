import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.models.Tasks || mongoose.model('Tasks', taskSchema);