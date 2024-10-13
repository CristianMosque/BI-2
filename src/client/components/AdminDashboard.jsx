import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: '', price: 0, features: '' });

  useEffect(() => {
    fetchUsers();
    fetchPlans();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/plans', {
        ...newPlan,
        features: newPlan.features.split(',').map(feature => feature.trim())
      });
      setNewPlan({ name: '', price: 0, features: '' });
      fetchPlans();
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email} - {user.role}</li>
        ))}
      </ul>
      <h3>Plans</h3>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>{plan.name} - ${plan.price}/month</li>
        ))}
      </ul>
      <h3>Create New Plan</h3>
      <form onSubmit={handleCreatePlan}>
        <input
          type="text"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          placeholder="Plan Name"
          required
        />
        <input
          type="number"
          value={newPlan.price}
          onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
          placeholder="Price"
          required
        />
        <input
          type="text"
          value={newPlan.features}
          onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
          placeholder="Features (comma-separated)"
          required
        />
        <button type="submit">Create Plan</button>
      </form>
    </div>
  );
}

export default AdminDashboard;