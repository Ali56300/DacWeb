import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const navigate = useNavigate();

  // Watch for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        const docRef = doc(db, 'clients', userAuth.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setClientData(docSnap.data());
          setSelectedService(docSnap.data().service || '');
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleServiceChange = async (e) => {
    const newService = e.target.value;
    setSelectedService(newService);

    if (user) {
      const clientRef = doc(db, 'clients', user.uid);
      await updateDoc(clientRef, { service: newService, status: 'In Progress' });
      setClientData(prev => ({ ...prev, service: newService, status: 'In Progress' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Client Dashboard</h2>

        {clientData ? (
          <>
            <p className="mb-2 text-lg"><strong>Welcome:</strong> {clientData.name}</p>
            <p className="mb-4"><strong>Status:</strong> <span className="text-blue-700">{clientData.status}</span></p>

            <label className="block text-sm font-medium mb-2">Choose a service:</label>
            <select
              className="w-full p-3 mb-4 border rounded-lg"
              value={selectedService}
              onChange={handleServiceChange}
            >
              <option value="">-- Select a service --</option>
              <option value="HR Consulting">HR Consulting</option>
              <option value="Software & Web Development">Software & Web Development</option>
              <option value="B2B Support">B2B Support</option>
              <option value="Digital Transformation">Digital Transformation</option>
              <option value="Microsoft 365 Training">Microsoft 365 Training</option>
              <option value="Immigration & Housing Forms">Immigration & Housing Forms</option>
            </select>
          </>
        ) : (
          <p>Loading your data...</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
