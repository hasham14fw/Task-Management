import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import Header from './components/functional/Header';
import MetricsSummary from './components/functional/MetricsSummary';
import TaskForm from './components/functional/TaskForm';
import TaskList from './components/functional/TaskList';
import ActivityLogger from './components/class/ActivityLogger';
import { ThemeContext } from './context/ThemeContext';
import './App.css';

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Architect React Component Tree',
    description: 'Design modular functional and class component boundaries.',
    priority: 'High',
    category: 'Work',
    status: 'completed',
    createdAt: '10:00 AM'
  },
  {
    id: '2',
    title: 'Implement ActivityLogger with Lifecycle Methods',
    description: 'Track operations using componentDidMount & componentDidUpdate.',
    priority: 'High',
    category: 'Work',
    status: 'completed',
    createdAt: '10:30 AM'
  },
  {
    id: '3',
    title: 'Apply React Hooks (useMemo, useCallback, useRef)',
    description: 'Optimize filtering calculations and manage auto-focusing.',
    priority: 'Medium',
    category: 'Study',
    status: 'pending',
    createdAt: '11:15 AM'
  },
  {
    id: '4',
    title: 'Prepare GitHub Repository and Deployment',
    description: 'Verify all requirements, capture dashboard screenshots, and submit.',
    priority: 'Medium',
    category: 'Project',
    status: 'pending',
    createdAt: '12:00 PM'
  }
];

function App() {
  const { theme } = useContext(ThemeContext);

  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem('dashboard_tasks');
      return stored ? JSON.parse(stored) : INITIAL_TASKS;
    } catch (e) {
      return INITIAL_TASKS;
    }
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [latestLog, setLatestLog] = useState(null);

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem('dashboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Dynamic document title update
  useEffect(() => {
    const pendingCount = tasks.filter(t => t.status === 'pending').length;
    document.title = `TaskFlow (${pendingCount} Pending) | Dashboard`;
  }, [tasks]);

  const logActivity = useCallback((text, type) => {
    setLatestLog({
      id: Date.now() + Math.random(),
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  }, []);

  // Handlers with useCallback
  const handleAddTask = useCallback((newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
    logActivity(`Added task: "${newTask.title}" [${newTask.priority}]`, 'create');
  }, [logActivity]);

  const handleToggleStatus = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';
          logActivity(`Marked "${task.title}" as ${updatedStatus}.`, 'status');
          return { ...task, status: updatedStatus };
        }
        return task;
      })
    );
  }, [logActivity]);

  const handleDeleteTask = useCallback((taskId) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    if (taskToDelete) {
      logActivity(`Deleted task: "${taskToDelete.title}"`, 'delete');
    }
  }, [tasks, logActivity]);

  const handleFilterStatusChange = useCallback((status) => {
    setFilterStatus(status);
    logActivity(`Status filter set to "${status}"`, 'filter');
  }, [logActivity]);

  const handleFilterPriorityChange = useCallback((priority) => {
    setFilterPriority(priority);
    logActivity(`Priority filter set to "${priority}"`, 'filter');
  }, [logActivity]);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Filtered tasks calculation with useMemo
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query)) ||
        task.category.toLowerCase().includes(query);

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, filterStatus, filterPriority, searchQuery]);

  // Metrics with useMemo
  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    const highPriority = tasks.filter(t => t.priority === 'High' && t.status === 'pending').length;

    return { total, completed, pending, highPriority };
  }, [tasks]);

  return (
    <div className={`app-root ${theme}`}>
      <div className="app-container">
        <Header />

        <MetricsSummary
          total={metrics.total}
          pending={metrics.pending}
          completed={metrics.completed}
          highPriority={metrics.highPriority}
        />

        <div className="dashboard-grid">
          <div className="grid-sidebar">
            <TaskForm onAddTask={handleAddTask} />
            <ActivityLogger incomingLog={latestLog} />
          </div>

          <div className="grid-main">
            <TaskList
              tasks={filteredTasks}
              filterStatus={filterStatus}
              filterPriority={filterPriority}
              searchQuery={searchQuery}
              onFilterStatusChange={handleFilterStatusChange}
              onFilterPriorityChange={handleFilterPriorityChange}
              onSearchChange={handleSearchChange}
              onToggleStatus={handleToggleStatus}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
