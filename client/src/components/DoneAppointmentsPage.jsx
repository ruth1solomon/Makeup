import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const DoneAppointmentsPage = () => {
    
  const [doneAppointments, setDoneAppointments] = useState([]);

  useEffect(() => {
    const fetchDoneAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments/done');
        setDoneAppointments(response.data);
      } catch (error) {
        console.error('Error fetching done appointments:', error);
      }
    };
    fetchDoneAppointments();
  }, []);

  return (
    <div>
        <Navbar/>
    <div className="container mx-auto p-6 bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">Completed Appointments</h2>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-pink-600 text-white text-md font-semibold text-left">
              <th className="p-4">Full Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Payment</th>
            </tr>
          </thead>
          <tbody>
            {doneAppointments.length > 0 ? (
              doneAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-100 border-b">
                  <td className="p-4">{appointment.fullName}</td>
                  <td className="p-4">{appointment.phoneNumber}</td>
                  <td className="p-4">{appointment.service}</td>
                  <td className="p-4">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="p-4">{appointment.time}</td>
                  <td className="p-4">{appointment.payment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No completed appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default DoneAppointmentsPage;
