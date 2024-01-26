import React, { useState, useEffect } from 'react';
import './toggle.scss';
import useLocalStorage from 'use-local-storage';

const Toggle = ({ onToggle }) => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorage('isDarkMode', prefersDarkMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setIsDarkMode(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setIsDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    onToggle(!isDarkMode ? 'dark' : 'light');
  }

  return (
    <div className='toggle-container'>
      <button 
        className={`toggle-btn ${isDarkMode ? 'toggle-active' : ''}`} 
        onClick={toggleMode}>
      </button>

      <svg className={`moon-icon ${isDarkMode ? 'moon-icon-active' : ''}`} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none"  d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>
    </div>
  );
};

export default Toggle;
