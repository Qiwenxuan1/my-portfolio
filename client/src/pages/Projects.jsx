import { useState, useEffect } from 'react';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects').then(res => setProjects(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-container"><h2>Loading...</h2></div>;
  
  return (
    <div className="page-container">
      <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>My Projects</h1>
      {projects.length === 0 ? <p>No projects found.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {projects.map(p => (
            <div key={p._id} className="card">
              <h3 style={{ marginTop: 0, fontSize: '20px', color: '#1e293b' }}>{p.title}</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', minHeight: '60px' }}>{p.description}</p>
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '15px', fontWeight: 'bold' }}>
                  View Live Demo →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Projects;