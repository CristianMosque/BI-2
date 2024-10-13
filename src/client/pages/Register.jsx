import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Register = () => {
  return (
    <Container>
      <h2>Register</h2>
      <RegisterForm />
    </Container>
  );
};

export default Register;