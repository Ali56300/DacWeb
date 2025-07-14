import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ChooseService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [service, setService] = useState('');

  if (!userId) {
    // If no userId passed, redirect to signup or login
    navigate('/signup');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!service) {
      alert('Please select a service.');
      return;
    }

    try {
      const clientRef = doc(db, 'clients', userId);
      await updateDoc(clientRef, { service, status: 'In Progress' });
      alert('Service selected! You are all set.');
      navigate('/dashboard'); // Redirect to client dashboard or wherever you want
    } catch (error) {
      alert('Failed to update service: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Service</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-3 border rounded mb-6"
          required
        >
          <option value="">-- Select a Service --</option>
          <option value="HR Consulting">HR Consulting</option>
          <option value="Software & Web Development">Software & Web Development</option>
          <option value="B2B Support">B2B Support</option>
          <option value="Digital Transformation">Digital Transformation</option>
          <option value="Microsoft 365 Training">Microsoft 365 Training</option>
          <option value="Immigration & Housing Forms">Immigration & Housing Forms</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition"
        >
          Confirm Service
        </button>
      </form>
    </div>
  );
};

export default ChooseService;
