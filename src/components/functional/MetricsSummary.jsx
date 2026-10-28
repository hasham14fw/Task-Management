import React from 'react';
import { IconClipboard, IconClock, IconCheckCircle, IconFlame } from './Icons';

const MetricsSummary = ({ total, pending, completed, highPriority }) => {
  return (
    <div className="metrics-grid">
      <div className="metric-card total">
        <div className="metric-icon">
          <IconClipboard size={22} />
        </div>
        <div className="metric-info">
          <span className="metric-label">Total Tasks</span>
          <span className="metric-value">{total}</span>
        </div>
      </div>

      <div className="metric-card pending">
        <div className="metric-icon">
          <IconClock size={22} />
        </div>
        <div className="metric-info">
          <span className="metric-label">Pending</span>
          <span className="metric-value">{pending}</span>
        </div>
      </div>

      <div className="metric-card completed">
        <div className="metric-icon">
          <IconCheckCircle size={22} />
        </div>
        <div className="metric-info">
          <span className="metric-label">Completed</span>
          <span className="metric-value">{completed}</span>
        </div>
      </div>

      <div className="metric-card high">
        <div className="metric-icon">
          <IconFlame size={22} />
        </div>
        <div className="metric-info">
          <span className="metric-label">High Priority</span>
          <span className="metric-value">{highPriority}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsSummary;
