import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at' }
});

const user = model('User', schema);

export default user; //model('User', schema);