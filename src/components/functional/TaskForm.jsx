import React, { useState, useRef, useEffect } from 'react';
import CardWrapper from './CardWrapper';
import { IconPlus } from './Icons';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Work');
  const [error, setError] = useState('');

  // Auto-focus using useRef
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title cannot be empty.');
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      status: 'pending',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onAddTask(newTask);

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setCategory('Work');
    setError('');

    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  return (
    <CardWrapper title="Add New Task" subtitle="Create and categorize a new task item">
      <form onSubmit={handleSubmit} className="task-form">
        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="task-title">Task Title *</label>
          <input
            id="task-title"
            ref={titleInputRef}
            type="text"
            className="form-input"
            placeholder="e.g., Finalize architecture presentation"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            className="form-textarea"
            rows="2"
            placeholder="Add relevant notes or details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="task-category">Category</label>
            <select
              id="task-category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Personal">Personal</option>
              <option value="Project">Project</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          <IconPlus size={16} />
          <span>Add Task</span>
        </button>
      </form>
    </CardWrapper>
  );
};

export default TaskForm;
