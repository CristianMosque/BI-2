import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/admin/UserTable';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin-top: 20px;
`;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: '', price: '', features: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/plans', {
        ...newPlan,
        price: parseFloat(newPlan.price),
        features: newPlan.features.split(',').map(feature => feature.trim())
      });
      setNewPlan({ name: '', price: '', features: '' });
      alert('Plan created successfully');
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  return (
    <Container>
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <UserTable users={users} />
      <h3>Create New Plan</h3>
      <Form onSubmit={handleCreatePlan}>
        <Input
          type="text"
          name="name"
          value={newPlan.name}
          onChange={handleInputChange}
          placeholder="Plan Name"
          required
        />
        <Input
          type="number"
          name="price"
          value={newPlan.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <Input
          type="text"
          name="features"
          value={newPlan.features}
          onChange={handleInputChange}
          placeholder="Features (comma-separated)"
          required
        />
        <Button type="submit">Create Plan</Button>
      </Form>
    </Container>
  );
};

export default AdminDashboard;