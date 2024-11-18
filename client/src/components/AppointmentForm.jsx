import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    service: 'Bridal Makeup',
    date: '',
    time: '',
    payment: '',
  });

  const [appointments, setAppointments] = useState([]); // List of existing appointments
  const [alert, setAlert] = useState({
    message: '',
    type: '', // 'success' or 'error'
  });

  // Fetch existing appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDateTime = `${formData.date}T${formData.time}`;
    
    // Check if the selected date and time conflict with existing appointments
    const isConflict = appointments.some((appointment) => {
      const existingDateTime = `${appointment.date}T${appointment.time}`;
      return selectedDateTime === existingDateTime;
    });

    if (isConflict) {
      setAlert({
        message: 'The selected time slot is already booked. Please choose a different time.',
        type: 'error',
      });
      return; // Don't proceed with the form submission if there is a conflict
    }

    const selectedDate = new Date(formData.date);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0); // Normalize current date to compare only date (not time)

    // Check if the selected date is in the past
    if (selectedDate < currentDate) {
      setAlert({
        message: 'The selected date is in the past. Please choose a future date.',
        type: 'error',
      });
      return; // Don't proceed with the form submission if the date is invalid
    }

    try {
      // Send the form data to the backend (your API endpoint)
      await axios.post('http://localhost:5000/api/appointments/create', formData);

      // Show success message
      setAlert({
        message: 'Appointment booked successfully!',
        type: 'success',
      });

      // Reset the form fields after successful booking
      setFormData({
        fullName: '',
        phoneNumber: '',
        service: 'Bridal Makeup',
        date: '',
        time: '',
        payment: '',
      });

      // Re-fetch appointments to update the list after successful booking
      const response = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      // Show error message
      setAlert({
        message: 'There was an error booking the appointment. Please try again.',
        type: 'error',
      });
      console.error('There was an error booking the appointment:', error);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Display Success/Error Alert */}
      {alert.message && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">
              {alert.type === 'success' ? '✅' : '❌'}
            </span>
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <form className="max-w-lg mx-auto bg-white p-6 rounded-2xl text-black my-10" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-pink-500 font-bold">Book an Appointment</h2>
        <div className="mb-4">
          <label className="block text-pink-500">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-pink-500">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            placeholder='+251963363663'
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-pink-500">Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
          >
            <option>Bridal Makeup</option>
            <option>Natural Makeup</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-pink-500">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-pink-500">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-pink-500">Payment</label>
          <input
            type="text"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-pink-500 p-2 rounded">Book Now</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
