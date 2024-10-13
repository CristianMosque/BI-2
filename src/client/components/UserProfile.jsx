import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchSubscription();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const response = await axios.get('/api/user/subscription');
      setSubscription(response.data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user/profile', profile);
      updateUser(profile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <input
          type="text"
          value={profile.name || ''}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="email"
          value={profile.email || ''}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          placeholder="Email"
        />
        <button type="submit">Update Profile</button>
      </form>
      {subscription && (
        <div>
          <h3>Current Subscription</h3>
          <p>Plan: {subscription.planName}</p>
          <p>Status: {subscription.status}</p>
          <p>Expires: {new Date(subscription.endDate).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;