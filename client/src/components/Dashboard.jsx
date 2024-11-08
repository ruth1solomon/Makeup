import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal'; // Assuming you have this component
import Navbar from './Navbar';



const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  
  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await axios.get('http://localhost:5000/api/appointments');
      const sortedAppointments = response.data.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
      });
      setAppointments(sortedAppointments);
    };
    fetchAppointments();
  }, []);


  // Mark appointment as done
  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      setAppointments(appointments.map(appointment =>
        appointment._id === id ? { ...appointment, status: 'Done' } : appointment
      ));
    } catch (error) {
      console.error('Error marking as done', error);
    }
  };

  // Delete an appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error('Error deleting appointment', error);
    }
  };

  // Open modal and set current appointment to be edited
  const handleEditClick = (appointment) => {
    setCurrentAppointment(appointment);  // Set the current appointment for editing
    setShowEditModal(true);  // Show the edit modal
  };

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto p-6 bg-black text-white">
      <h2 className="text-2xl text-pink-500 mb-6">Dashboard - Appointments</h2>
      <table className="table-auto w-full bg-gray-800 rounded">
        <thead className="text-pink-500">
          <tr>
            <th className="p-4">Full Name</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Service</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id} className="text-center">
              <td className="p-4">{appointment.fullName}</td>
              <td className="p-4">{appointment.phoneNumber}</td>
              <td className="p-4">{appointment.service}</td>
              <td className="p-4">{new Date(appointment.date).toLocaleDateString()}</td>
              <td className="p-4">{appointment.time}</td>
              <td className="p-4">{appointment.status}</td>
              <td className="p-4">
                <button 
                  className="bg-pink-500 p-2 rounded mx-2"
                  onClick={() => handleMarkAsDone(appointment._id)}
                >
                  Mark as Done
                </button>
                <button
                  className="bg-pink-500 p-2 rounded mx-2"
                  onClick={() => handleEditClick(appointment)}
                >
                  Edit
                </button>
                <button 
                  className="bg-pink-500 p-2 rounded mx-2"
                  onClick={() => handleDelete(appointment._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the Edit Modal if an appointment is selected */}
      {currentAppointment && (
        <EditAppointmentModal
          currentAppointment={currentAppointment}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          fetchAppointments={() => {
            // Re-fetch appointments to update the table after an edit
            const fetchAppointments = async () => {
              const response = await axios.get('http://localhost:5000/api/appointments');
              setAppointments(response.data);
            };
            fetchAppointments();
          }}
        />
      )}
    </div>
    </div>
  );
};

export default Dashboard;
