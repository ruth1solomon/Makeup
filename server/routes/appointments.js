const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Fetch only appointments with status 'Done'
router.get('/done', async (req, res) => {
    try {
        const doneAppointments = await Appointment.find({ status: 'Done' });
        res.json(doneAppointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching done appointments' });
    }
});

// Mark an appointment as done
router.put('/:id/done', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'Done' },
            { new: true }
        );
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment status' });
    }
});

// Create a new appointment
router.post('/create', async (req, res) => {
    try {
        const { fullName, phoneNumber, service, date, time, payment } = req.body;
        const notifyDate = new Date(date);
        notifyDate.setDate(notifyDate.getDate() - 3); // Notify 3 days before

        // Check if the selected date is in the past
        const selectedDate = new Date(date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Normalize current date to compare only date (not time)

        if (selectedDate < currentDate) {
            return res.status(400).json({ message: 'The selected date is in the past. Please choose a future date.' });
        }

        // Check if there's already an appointment for the selected date and time
        const existingAppointment = await Appointment.findOne({ date, time });
        if (existingAppointment) {
            return res.status(400).json({ message: 'The selected time slot is already booked. Please choose a different time.' });
        }

        // Create the new appointment if no conflicts
        const newAppointment = new Appointment({
            fullName,
            phoneNumber,
            service,
            date,
            time,
            payment,
            notifyDate,
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update an appointment
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Edit an appointment route
router.put('/api/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { fullName, phoneNumber, date, time, service, payment } = req.body;

    try {
        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { fullName, phoneNumber, date, time, service, payment },
            { new: true } // Return the updated appointment
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark as done
router.put('/:id/done', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Done' }, { new: true });
        res.status(200).json({ message: 'Marked as done', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Appointment canceled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
