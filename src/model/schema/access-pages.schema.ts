import mongoose from "mongoose";

const AccessPageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    path: {
        type: String,
    },
    method: {
        type: String,
    },
    from: { // Que categoria pertenece
        type: String,
        enum: ['front', 'back']
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
});

const User = mongoose.model('Access-Page', AccessPageSchema);
export default User;