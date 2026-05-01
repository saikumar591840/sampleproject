import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProjectCard = ({ project, onDelete, onAddMember }) => {
  const { user } = useContext(AuthContext);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [newMemberId, setNewMemberId] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberId.trim()) return;
    onAddMember(project._id, newMemberId);
    setNewMemberId('');
    setShowMemberForm(false);
  };

  return (
    <div className="stat-card modern-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3>{project.name}</h3>
        {user?.role === 'Admin' && (
          <button 
            onClick={() => onDelete(project._id)} 
            style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}
          >
            &times;
          </button>
        )}
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', flexGrow: 1 }}>
        {project.description || 'No description provided.'}
      </p>
      
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Members ({project.teamMembers.length})</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/projects/${project._id}`} className="btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', textDecoration: 'none', margin: 0 }}>View</Link>
            {user?.role === 'Admin' && (
              <button 
                onClick={() => setShowMemberForm(!showMemberForm)} 
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.875rem' }}
              >
                {showMemberForm ? 'Cancel' : '+ Add'}
              </button>
            )}
          </div>
        </div>
        
        {showMemberForm && (
          <form onSubmit={handleAddMember} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="User ID" 
              value={newMemberId} 
              onChange={e => setNewMemberId(e.target.value)}
              required
              style={{ flex: 1, background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '0.5rem', color: 'white' }}
            />
            <button type="submit" className="btn-primary" style={{ margin: 0, padding: '0.5rem 1rem' }} disabled={!newMemberId.trim()}>Add</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
