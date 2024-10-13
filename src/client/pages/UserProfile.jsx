import React from 'react';
import ProfileForm from '../components/user/ProfileForm';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const UserProfile = () => {
  return (
    <Container>
      <h2>User Profile</h2>
      <ProfileForm />
    </Container>
  );
};

export default UserProfile;