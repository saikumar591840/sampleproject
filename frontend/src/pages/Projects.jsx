import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { user } = useContext(AuthContext);
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/projects');
      setProjects(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setActionError('Project name is required');
      setTimeout(() => setActionError(''), 3000);
      return;
    }

    try {
      await api.post('/api/projects', { name, description });
      setName('');
      setDescription('');
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to create project');
      setTimeout(() => setActionError(''), 3000);
    }
  };

  const handleAddMember = async (projectId, userId) => {
    try {
      await api.post(`/api/projects/${projectId}/members`, { userId });
      fetchProjects();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to add member');
      setTimeout(() => setActionError(''), 3000);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to delete project');
      setTimeout(() => setActionError(''), 3000);
    }
  };

  if (loading) return <div className="loading-screen">Loading projects...</div>;

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Projects</h1>
          <p>Manage your team projects.</p>
        </div>
        {user?.role === 'Admin' && (
          <button className="btn-primary" onClick={() => setShowForm(!showForm)} style={{ marginTop: 0 }}>
            {showForm ? 'Cancel' : '+ New Project'}
          </button>
        )}
      </div>

      {error && <div className="auth-error">{error}</div>}
      {actionError && <div className="auth-error" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>{actionError}</div>}

      {showForm && (
        <div className="auth-card" style={{ marginBottom: '2rem', maxWidth: '100%' }}>
          <h3>Create New Project</h3>
          <form onSubmit={handleCreateProject} className="auth-form" style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label>Project Name *</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                placeholder="e.g. Website Redesign"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input 
                type="text" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn-primary" disabled={!name.trim()}>Create Project</button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {projects.map(project => (
          <ProjectCard 
            key={project._id} 
            project={project} 
            onDelete={handleDeleteProject}
            onAddMember={handleAddMember}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
