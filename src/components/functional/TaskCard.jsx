import React from 'react';
import { IconCheck, IconFlame, IconTrash } from './Icons';

const TaskCard = ({ task, onToggleStatus, onDeleteTask }) => {
  const isCompleted = task.status === 'completed';
  const isHighPriority = task.priority === 'High';

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-card-main">
        <button
          type="button"
          className={`status-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleStatus(task.id)}
          aria-label={isCompleted ? 'Mark as pending' : 'Mark as completed'}
        >
          {isCompleted && <IconCheck size={14} />}
        </button>

        <div className="task-card-body">
          <div className="task-card-header">
            <h3 className="task-title">
              {task.title}
              <span className="task-category-tag"> ({task.category.toLowerCase()})</span>
            </h3>

            <div className="task-badges">
              {isHighPriority && (
                <span className="badge badge-indicator" title="Urgent attention required">
                  <IconFlame size={12} />
                  <span>Urgent</span>
                </span>
              )}
              <span className={`badge badge-priority badge-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className="badge badge-category">
                {task.category}
              </span>
            </div>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta">
            <span className="task-time">Created: {task.createdAt}</span>
            <span className={`status-pill ${task.status}`}>
              {task.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
        </div>
      </div>

      <div className="task-card-actions">
        <button
          type="button"
          className="btn-icon delete-btn"
          onClick={() => onDeleteTask(task.id)}
          title="Delete task"
          aria-label="Delete task"
        >
          <IconTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
