import React, { useState, useEffect } from 'react';
import { format, isSameDay } from 'date-fns';
import axios from 'axios';
import Navbar from './Navbar';

const CalendarPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentsOnSelectedDate, setAppointmentsOnSelectedDate] = useState([]);

  useEffect(() => {
    // Fetch appointments from the server
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  // Function to check if the day is booked
  const isBooked = (date) => {
    return appointments.some(appointment =>
      isSameDay(new Date(appointment.date), date)
    );
  };

  // Function to handle date selection and filter appointments for that day
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const selectedAppointments = appointments.filter(appointment =>
      isSameDay(new Date(appointment.date), date)
    );
    setAppointmentsOnSelectedDate(selectedAppointments);
  };

  // Days of the week for the header
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Function to render the calendar
  const renderCalendar = () => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const totalDays = endOfMonth.getDate();
    const days = [];

    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(today.getFullYear(), today.getMonth(), i);
      days.push(day);
    }

    return days.map((day, index) => (
      <div
        key={index}
        className={`p-2 h-20 w-20 flex items-center justify-center cursor-pointer 
        ${isBooked(day) ? 'bg-pink-500 text-white' : 'bg-gray-200'}
        hover:bg-gray-300 rounded-md`}
        onClick={() => handleDateClick(day)}
      >
        {format(day, 'd')}
      </div>
    ));
  };

  return (
    <div>
    <Navbar/>
    <div className="container mx-auto p-6 bg-white text-black">
      <h2 className="text-3xl font-bold mb-6 text-center">Appointment Calendar</h2>
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <div className="grid grid-cols-7 gap-4">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-bold">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4 mt-4">
          {renderCalendar()}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4 p-4 bg-gray-200 rounded-md shadow-md">
          <h3 className="text-xl font-bold">Selected Date: {format(selectedDate, 'MMMM d, yyyy')}</h3>
          {appointmentsOnSelectedDate.length > 0 ? (
            <ul className="mt-4">
              {appointmentsOnSelectedDate.map(appointment => (
                <li key={appointment._id} className="bg-gray-300 p-3 rounded mb-2">
                  <strong>Name:</strong> {appointment.fullName} <br />
                  <strong>Time:</strong> {appointment.time} <br />
                  <strong>Phone Number:</strong> {appointment.phoneNumber}
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments on this date.</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default CalendarPage;

