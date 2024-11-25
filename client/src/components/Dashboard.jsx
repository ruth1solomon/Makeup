import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  
  const [alert, setAlert] = useState({
    message: '',
    type: '', // 'success' or 'error'
    action: '', // 'cancel' or 'done'
  });

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

  // Handle showing success message
  const showSuccessMessage = (message, action) => {
    setAlert({
      message,
      type: 'success',
      action,
    });
    setTimeout(() => {
      setAlert({ message: '', type: '', action: '' }); // Clear message after 3 seconds
    }, 3000);
  };

  // Mark appointment as done
  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      // Update the status of the marked appointment and remove it from the dashboard list
      setAppointments(appointments.filter(appointment =>
        appointment._id !== id
      ));
      showSuccessMessage('Appointment marked as done!', 'done');
    } catch (error) {
      console.error('Error marking as done', error);
    }
  };

  // Delete an appointment with confirmation
  const handleDelete = async (id) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this appointment? This action cannot be undone.'
    );

    if (!confirmCancel) {
      return; // Exit the function if the user cancels the action
    }

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments(appointments.filter(appointment => appointment._id !== id));
      showSuccessMessage('Appointment canceled successfully!', 'cancel');
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
      <Navbar />
      <div className="container mx-auto p-6 bg-black text-white">
        <h2 className="text-2xl text-pink-500 mb-6">Dashboard - Appointments</h2>
        
        {/* Success Message */}
        {alert.message && (
          <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg transition-all duration-500
            ${alert.action === 'cancel' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {alert.action === 'cancel' ? '❌' : '😊'}
              </span>
              <span>{alert.message}</span>
            </div>
          </div>
        )}

        <table className="table-auto w-full bg-gray-800 rounded">
          <thead className="text-pink-500">
            <tr>
              <th className="p-4">Full Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Payment</th>
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
                <td className="p-4">{appointment.payment}</td>
                <td className="p-4">{appointment.status}</td>
                <td className="p-4">
                  <button 
                    className="bg-pink-500 p-1 rounded mx-2 my-1"
                    onClick={() => handleMarkAsDone(appointment._id)}
                  >
                    Done
                  </button>
                  <button
                    className="bg-pink-500 p-1 rounded mx-2 my-1"
                    onClick={() => handleEditClick(appointment)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-pink-500 p-1 rounded mx-2 my-1"
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
