import React from 'react';
import ThemeToggle from './ThemeToggle';
import { IconBolt } from './Icons';

const Header = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-badge">
          <IconBolt size={24} />
        </div>
        <div>
          <h1 className="header-title">TaskFlow & Activity Dashboard</h1>
          <p className="header-subtitle">Advanced React Component Architecture &amp; State Management</p>
        </div>
      </div>
      <div className="header-right">
        <span className="current-date">{today}</span>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
