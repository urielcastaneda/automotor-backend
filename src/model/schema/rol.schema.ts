import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    toBack: [
        {
            ref: 'Access-Page',
            type: Array,
        }
    ],
    toFront: [
        {
            ref: 'Access-Page',
            type: Array
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
});

const User = mongoose.model('Role', RoleSchema);
export default User;