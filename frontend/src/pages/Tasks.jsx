import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import ToastContext from '../context/ToastContext';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  
  const { addToast } = useContext(ToastContext);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/tasks/my-tasks');
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/api/tasks/${taskId}`, { status: newStatus });
      addToast('Task status updated successfully', 'success');
      fetchMyTasks();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to update status');
      setTimeout(() => setActionError(''), 3000);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/api/tasks/${taskId}`);
      fetchMyTasks();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to delete task');
      setTimeout(() => setActionError(''), 3000);
    }
  };

  if (loading) return <div className="loading-screen">Loading your tasks...</div>;

  // Apply search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>My Tasks</h1>
          <p>A global view of all tasks assigned to you across all projects.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'rgba(15, 23, 42, 0.6)', color: 'white' }}
          />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'rgba(15, 23, 42, 0.6)', color: 'white' }}
          >
            <option value="All">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '2rem' }}>{error}</div>}
      {actionError && <div className="auth-error" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderColor: 'rgba(245, 158, 11, 0.2)', marginBottom: '2rem' }}>{actionError}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {['Todo', 'In Progress', 'Done'].map(columnStatus => (
          <div key={columnStatus} className="task-column">
            <h3 className={`column-header status-${columnStatus.replace(/\s+/g, '-').toLowerCase()}`}>
              {columnStatus} <span className="task-count">{filteredTasks.filter(t => t.status === columnStatus).length}</span>
            </h3>
            <div className="task-list">
              {filteredTasks.filter(t => t.status === columnStatus).map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  columnStatus={columnStatus} 
                  onUpdateStatus={handleUpdateTaskStatus} 
                  onDelete={handleDeleteTask} 
                />
              ))}
              {filteredTasks.filter(t => t.status === columnStatus).length === 0 && (
                <p className="empty-state">No tasks here</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
