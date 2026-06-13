import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const getInitialTheme = (initialTheme) => {
  if (initialTheme) return initialTheme;
  if (typeof window === 'undefined') return 'dark';
  try {
    return localStorage.getItem('theme') || 'dark';
  } catch {
    return 'dark';
  }
};

export const ThemeProvider = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState(() => getInitialTheme(initialTheme));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage can be unavailable in private browsing contexts.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
