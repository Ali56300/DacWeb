import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/admin-login');
        return;
      }
      // Check admin email, redirect if not
      if (user.email !== 'youradmin@example.com') {
        alert('Access denied');
        await signOut(auth);
        navigate('/admin-login');
        return;
      }

      // Fetch clients
      const clientsCol = collection(db, 'clients');
      const q = query(clientsCol, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const clientList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClients(clientList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleStatusChange = async (clientId, newStatus) => {
    const clientRef = doc(db, 'clients', clientId);
    await updateDoc(clientRef, { status: newStatus });
    setClients(prev =>
      prev.map(client => client.id === clientId ? { ...client, status: newStatus } : client)
    );
    // TODO: Trigger email notification (later step)
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin-login');
  };

  if (loading) return <p className="p-6 text-center">Loading clients...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Service</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td className="border border-gray-300 p-2">{client.name}</td>
                <td className="border border-gray-300 p-2">{client.email}</td>
                <td className="border border-gray-300 p-2">{client.service || '-'}</td>
                <td className="border border-gray-300 p-2">{client.status}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={client.status}
                    onChange={(e) => handleStatusChange(client.id, e.target.value)}
                    className="p-1 rounded border border-gray-300"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
