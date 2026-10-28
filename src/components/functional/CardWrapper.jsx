import React from 'react';

const CardWrapper = ({ title, count, subtitle, action, children, className = '' }) => {
  return (
    <div className={`card-wrapper ${className}`}>
      {(title || action) && (
        <div className="card-header">
          <div className="card-title-group">
            {title && <h2 className="card-title">{title}</h2>}
            {count !== undefined && <span className="card-badge">{count}</span>}
          </div>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
          {action && <div className="card-action">{action}</div>}
        </div>
      )}

      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
