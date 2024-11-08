import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    service: 'Bridal Makeup',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments/create', formData);
      alert('Appointment booked successfully');
    } catch (error) {
      console.error('There was an error booking the appointment:', error);
    }
  };

  return (
    <div> 
    <Navbar/>
    <form className="max-w-lg mx-auto bg-white p-6 rounded-2xl text-black my-10" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-6 text-pink-500 font-bold">Book an Appointment</h2>
      <div className="mb-4">
        <label className="block text-pink-500">Full Name</label>
        <input type="text" name="fullName" onChange={handleChange} className="w-full p-2 bg-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-pink-500">Phone Number</label>
        <input type="tel" name="phoneNumber" onChange={handleChange} className="w-full p-2 bg-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-pink-500">Service</label>
        <select name="service" onChange={handleChange} className="w-full p-2 bg-gray-300 rounded">
          <option>Bridal Makeup</option>
          <option>Natural Makeup</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-pink-500">Date</label>
        <input type="date" name="date" onChange={handleChange} className="w-full p-2 bg-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-pink-500">Time</label>
        <input type="time" name="time" onChange={handleChange} className="w-full p-2 bg-gray-300 rounded" required />
      </div>
      <button type="submit" className="w-full bg-pink-500 p-2 rounded">Book Now</button>
    </form>
    </div>
  );
};

export default AppointmentForm;
