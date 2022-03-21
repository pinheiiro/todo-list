import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    tasks: [
        {
            task: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false,
                required: false
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
})

export default mongoose.models.Tasks || mongoose.model('Tasks', taskSchema);