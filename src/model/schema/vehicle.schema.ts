import mongoose, { Schema } from "mongoose";

const VehicleSchema = new mongoose.Schema({
    propietario: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    placa: {
        type: String,
        unique: true,
        required: true,
    },
    fecha_tarjeta_op: {
        type: String,
        required: true,
    },
    fecha_soat: {
        type: String,
        required: true,
    },
    cilindraje: {
        type: Number, // Cilindraje
        required: true,
    },
    capacidad: {
        type: Number, // Libras
        required: true,
    },
    travel_status: {
        type: Boolean,
        default: true,
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

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
export default Vehicle;