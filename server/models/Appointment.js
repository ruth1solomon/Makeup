const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        enum: ['Bridal Makeup', 'Natural Makeup'],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Done'],
        default: 'Pending',
    },
    notifyDate: Date,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
