import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { IconSun, IconMoon } from './Icons';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      <span className="toggle-icon">
        {theme === 'light' ? <IconMoon size={16} /> : <IconSun size={16} />}
      </span>
      <span className="toggle-text">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
