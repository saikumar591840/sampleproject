import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/api/tasks/stats');
        
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="loading-screen">Loading dashboard...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
          <h1>Dashboard Overview</h1>
          <p>Here's what's happening with your tasks today.</p>
          {error && <div className="auth-error" style={{marginTop: '1rem'}}>{error}</div>}
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p className="stat-value">{stats.total}</p>
            <div style={{ marginTop: '1rem', width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'var(--primary)' }}></div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-value" style={{ color: 'var(--success)' }}>{stats.completed}</p>
            <div style={{ marginTop: '1rem', width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: stats.total ? `${(stats.completed / stats.total) * 100}%` : '0%', height: '100%', background: 'var(--success)' }}></div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-value" style={{ color: '#60a5fa' }}>{stats.pending}</p>
            <div style={{ marginTop: '1rem', width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: stats.total ? `${(stats.pending / stats.total) * 100}%` : '0%', height: '100%', background: '#60a5fa' }}></div>
            </div>
          </div>
          
          <div className="stat-card stat-overdue">
            <h3>Overdue</h3>
            <p className="stat-value" style={{ color: 'var(--error)' }}>{stats.overdue}</p>
            <div style={{ marginTop: '1rem', width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: stats.total ? `${(stats.overdue / stats.total) * 100}%` : '0%', height: '100%', background: 'var(--error)' }}></div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
