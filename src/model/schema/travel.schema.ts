import mongoose, { Schema } from "mongoose";

const TravelSchema = new mongoose.Schema({
    vehicle: {
        ref: 'Vehicle',
        type: Schema.Types.ObjectId,
    },
    client: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    data_init: {
        type: String,
        required: true
    },
    date_ac: { // Fecha Aceptado --
        type: String,
    },
    date_end: { // Fecha Finalizado
        type: String,
    },
    location_init: {
        type: Object, // Locacalizacion principal e inicial
        required: true,
    },
    location_end: {
        type: Object, // Locacalizacion final
        required: true,
    },
    travel_status: {
        type: String,
        enum: ['wait', 'accept', 'finalized'],
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Travel = mongoose.model('Travel', TravelSchema);
export default Travel;