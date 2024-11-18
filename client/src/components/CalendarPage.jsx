import React, { useState, useEffect } from 'react';
import { format, isSameDay, startOfMonth, endOfMonth, addMonths, subMonths, startOfWeek, addDays } from 'date-fns';
import axios from 'axios';
import Navbar from './Navbar';

const CalendarPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentsOnSelectedDate, setAppointmentsOnSelectedDate] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
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

  const isBooked = (date) => {
    return appointments.some(appointment =>
      isSameDay(new Date(appointment.date), date)
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const selectedAppointments = appointments.filter(appointment =>
      isSameDay(new Date(appointment.date), date)
    );
    setAppointmentsOnSelectedDate(selectedAppointments);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(endOfMonth(currentMonth), 6 - endOfMonth(currentMonth).getDay());

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days.map((day, index) => (
      <div
        key={index}
        className={`p-3 h-16 w-16 flex items-center justify-center cursor-pointer 
        ${isSameDay(day, selectedDate) ? 'bg-blue-400 text-white' : ''}
        ${isBooked(day) ? 'bg-pink-500 text-white' : 'bg-gray-200'}
        hover:bg-gray-300 rounded-md text-sm`}
        onClick={() => handleDateClick(day)}
      >
        {format(day, 'd')}
      </div>
    ));
  };

  return (
    <div>
      <Navbar/>
      <div className="container mx-auto p-4 bg-white text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">Appointment Calendar</h2>
        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePreviousMonth} className="text-lg font-bold">{'<'}</button>
          <h3 className="text-lg font-bold">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button onClick={handleNextMonth} className="text-lg font-bold">{'>'}</button>
        </div>
        <div className="bg-gray-100 p-3  rounded-md shadow-md">
          <div className="grid grid-cols-7 gap-4 text-lg">
            {daysOfWeek.map((day, index) => (
              <div key={index} className=" m-2 font-bold">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 mt-2">
            {renderCalendar()}
          </div>
        </div>

        {selectedDate && (
          <div className="mt-3 p-3 bg-gray-200 rounded-md shadow-md">
            <h3 className="text-lg font-bold">Selected Date: {format(selectedDate, 'MMMM d, yyyy')}</h3>
            {appointmentsOnSelectedDate.length > 0 ? (
              <ul className="mt-2 text-sm">
                {appointmentsOnSelectedDate.map(appointment => (
                  <li key={appointment._id} className="bg-gray-300 p-2 rounded mb-1">
                    <strong>Name:</strong> {appointment.fullName} <br />
                    <strong>Time:</strong> {appointment.time} <br />
                    <strong>Phone Number:</strong> {appointment.phoneNumber}<br/>
                    <strong>Status:</strong>{appointment.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">No appointments on this date.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;


