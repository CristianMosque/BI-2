import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const lightTheme = {
  primaryColor: '#007bff',
  primaryColorHover: '#0056b3',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderColor: '#dddddd',
  errorColor: '#dc3545'
};

const darkTheme = {
  primaryColor: '#0056b3',
  primaryColorHover: '#003d82',
  backgroundColor: '#333333',
  textColor: '#ffffff',
  borderColor: '#555555',
  errorColor: '#ff6b6b'
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};