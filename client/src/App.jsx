import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppointmentForm from './components/AppointmentForm';
import Dashboard from './components/Dashboard';
import CalendarPage from './components/CalendarPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DoneAppointmentsPage from './components/DoneAppointmentsPage';
function App() {
  return (
    <div className='bg-gradient-to-br from-pink-200 to-purple-300 min-h-screen'>
    <Router  >
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/book" element={<AppointmentForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/done" element={<DoneAppointmentsPage />} />


      </Routes>
    </Router>
    </div>
  );
}

export default App;

