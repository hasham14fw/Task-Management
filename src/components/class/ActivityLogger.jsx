import React, { Component } from 'react';
import CardWrapper from '../functional/CardWrapper';
import { IconBell, IconFileText, IconX } from '../functional/Icons';

class ActivityLogger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      filterType: 'all',
      toastMessage: null,
      autoScroll: true
    };

    this.toastTimeoutId = null;
    this.clockIntervalId = null;

    this.handleClearLogs = this.handleClearLogs.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  // Lifecycle: componentDidMount
  componentDidMount() {
    try {
      const storedLogs = localStorage.getItem('system_activity_logs');
      if (storedLogs) {
        this.setState({ logs: JSON.parse(storedLogs) });
      }
    } catch (error) {
      console.error('Failed to parse logs from localStorage:', error);
    }

    this.clockIntervalId = setInterval(() => {}, 15000);
  }

  // Lifecycle: componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if (this.props.incomingLog && this.props.incomingLog !== prevProps.incomingLog) {
      const updatedLogs = [this.props.incomingLog, ...this.state.logs].slice(0, 50);

      this.setState({
        logs: updatedLogs,
        toastMessage: this.props.incomingLog.text
      });

      if (this.toastTimeoutId) {
        clearTimeout(this.toastTimeoutId);
      }
      this.toastTimeoutId = setTimeout(() => {
        this.dismissToast();
      }, 3500);
    }

    if (this.state.logs !== prevState.logs) {
      try {
        localStorage.setItem('system_activity_logs', JSON.stringify(this.state.logs));
      } catch (error) {
        console.error('Failed to save logs to localStorage:', error);
      }
    }
  }

  // Lifecycle: componentWillUnmount
  componentWillUnmount() {
    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }
    if (this.clockIntervalId) {
      clearInterval(this.clockIntervalId);
    }
  }

  dismissToast() {
    this.setState({ toastMessage: null });
  }

  handleClearLogs() {
    this.setState({ logs: [], toastMessage: 'Activity log records cleared.' });
    localStorage.removeItem('system_activity_logs');

    if (this.toastTimeoutId) clearTimeout(this.toastTimeoutId);
    this.toastTimeoutId = setTimeout(this.dismissToast, 2500);
  }

  handleFilterChange(e) {
    this.setState({ filterType: e.target.value });
  }

  render() {
    const { logs, filterType, toastMessage } = this.state;

    const filteredLogs = logs.filter(log => {
      if (filterType === 'all') return true;
      return log.type.toLowerCase() === filterType.toLowerCase();
    });

    return (
      <CardWrapper
        title="System Activity Logger"
        count={logs.length}
        subtitle="Class Component with componentDidMount & componentDidUpdate"
        action={
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={this.handleClearLogs}
            disabled={logs.length === 0}
          >
            Clear History
          </button>
        }
      >
        {toastMessage && (
          <div className="logger-toast">
            <span className="toast-icon">
              <IconBell size={16} />
            </span>
            <span className="toast-text">{toastMessage}</span>
            <button
              type="button"
              className="toast-close"
              onClick={this.dismissToast}
              aria-label="Dismiss toast"
            >
              <IconX size={14} />
            </button>
          </div>
        )}

        <div className="logger-toolbar">
          <label htmlFor="log-filter-select" className="logger-filter-label">
            Filter Log Event:
          </label>
          <select
            id="log-filter-select"
            className="form-select logger-select"
            value={filterType}
            onChange={this.handleFilterChange}
          >
            <option value="all">All Events ({logs.length})</option>
            <option value="create">Task Created</option>
            <option value="delete">Task Deleted</option>
            <option value="status">Status Toggled</option>
            <option value="filter">Filter Changed</option>
          </select>
        </div>

        <div className="logger-feed">
          {filteredLogs.length === 0 ? (
            <div className="empty-logs">
              <span className="empty-logs-icon">
                <IconFileText size={26} />
              </span>
              <p>No activity records found.</p>
            </div>
          ) : (
            filteredLogs.map(log => (
              <div key={log.id} className={`log-entry log-${log.type.toLowerCase()}`}>
                <div className="log-badge-wrapper">
                  <span className={`log-tag log-tag-${log.type.toLowerCase()}`}>
                    {log.type.toUpperCase()}
                  </span>
                  <span className="log-timestamp">{log.timestamp}</span>
                </div>
                <div className="log-body">{log.text}</div>
              </div>
            ))
          )}
        </div>
      </CardWrapper>
    );
  }
}

export default ActivityLogger;
