import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import PlanSelection from './pages/PlanSelection';
import AdminDashboard from './pages/AdminDashboard';
import Button from './components/common/Button';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    font-family: Arial, sans-serif;
  }
`;

const Nav = styled.nav`
  background-color: ${props => props.theme.primaryColor};
  padding: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1rem;
`;

function App() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <GlobalStyle />
      <Nav>
        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/plans">Plans</NavLink>
            {user.role === 'admin' && <NavLink to="/admin">Admin Dashboard</NavLink>}
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
        <Button onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/plans" element={<PlanSelection />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

function AppWithProviders() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppWithProviders;