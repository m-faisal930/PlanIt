import React, { createContext, useContext, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access
export const useTheme = () => useContext(ThemeContext);
