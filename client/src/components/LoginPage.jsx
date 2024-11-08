import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(res.data);
      navigate('/book');
    } catch (err) {
      // Handle error and display message
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.message);
    } else {
        setErrorMessage('Something went wrong. Please try again.');
    }
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-pink-200 to-purple-300 flex flex-col items-center justify-center">
       
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">Login</h1>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
        />
        
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-4 mb-6 border border-gray-300 rounded-lg"
        />
        
        <button type="submit" className="w-full bg-pink-600 text-white py-4 rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out">Login</button>
        {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                        {errorMessage}
                    </div>
                )}
      <p className="text-center mt-4 text-gray-500">
        Don't have an account? <Link to="/register" className="text-pink-600 hover:underline">Register</Link>
      </p>
      </form>
      
    </div>
  );
};

export default LoginPage;
