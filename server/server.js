const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();


// Connect to MongoDB
mongoose.connect('mongodb+srv://ruthwoldesemait:RuthWoldesemait@cluster0.43voo.mongodb.net/Makeup?tls=true&tlsInsecure=true', )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
