import React from 'react';
import CardWrapper from './CardWrapper';
import TaskCard from './TaskCard';
import { IconSearch, IconInbox } from './Icons';

const TaskList = ({
  tasks,
  filterStatus,
  filterPriority,
  searchQuery,
  onFilterStatusChange,
  onFilterPriorityChange,
  onSearchChange,
  onToggleStatus,
  onDeleteTask
}) => {
  return (
    <CardWrapper
      title="Task Collection"
      count={tasks.length}
      subtitle="Filter, inspect, and manage active workflow items"
    >
      <div className="task-toolbar">
        <div className="search-box">
          <div className="search-input-wrapper">
            <span className="search-icon-adornment">
              <IconSearch size={16} />
            </span>
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search tasks by title, category..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-controls">
          <select
            className="form-select filter-select"
            value={filterStatus}
            onChange={(e) => onFilterStatusChange(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            className="form-select filter-select"
            value={filterPriority}
            onChange={(e) => onFilterPriorityChange(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="task-items-container">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">
              <IconInbox size={36} />
            </span>
            <h4>No tasks match your criteria</h4>
            <p>Try clearing your filters or create a new task using the form.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </CardWrapper>
  );
};

export default TaskList;
