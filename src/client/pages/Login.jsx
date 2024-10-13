import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Login = () => {
  return (
    <Container>
      <h2>Login</h2>
      <LoginForm />
    </Container>
  );
};

export default Login;