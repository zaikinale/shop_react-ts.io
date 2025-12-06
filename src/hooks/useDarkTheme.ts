// hooks/useDarkTheme.js
import { useState, useEffect } from 'react';

const THEME_KEY = 'theme';

export default function useDarkTheme() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem(THEME_KEY) === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem(THEME_KEY, 'light'); 
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return [isDark, toggleTheme];
}