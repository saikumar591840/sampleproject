import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Task Manager</h2>
      </div>
      
      <div className="sidebar-user">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
        <div className="user-info">
          <p className="user-name">{user?.name}</p>
          <p className="user-role">{user?.role}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </Link>
        <Link to="/projects" className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>
          <span className="icon">📁</span>
          <span>Projects</span>
        </Link>
        <Link to="/tasks" className={`nav-item ${isActive('/tasks') ? 'active' : ''}`}>
          <span className="icon">✓</span>
          <span>My Tasks</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
