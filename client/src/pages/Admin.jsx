import { useState, useEffect } from 'react';
import api from '../services/api';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [pForm, setPForm] = useState({ title: '', description: '', liveUrl: '' });
  
  const [posts, setPosts] = useState([]);
  const [bForm, setBForm] = useState({ title: '', content: '' });

  const fetchData = async () => {
    try {
      const [resP, resB] = await Promise.all([api.get('/projects'), api.get('/blog')]);
      setProjects(resP.data); 
      setPosts(resB.data);
    } catch (error) {
      console.error("获取数据失败", error);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', pForm);
      setPForm({ title: '', description: '', liveUrl: '' }); 
      fetchData();
    } catch (error) {
      alert("添加项目失败");
    }
  };

  const deleteProject = async (id) => { 
    try {
      await api.delete(`/projects/${id}`); 
      fetchData(); 
    } catch (error) {
      alert("删除项目失败");
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    try {
      await api.post('/blog', bForm);
      setBForm({ title: '', content: '' }); 
      fetchData();
    } catch (error) {
      alert("添加文章失败");
    }
  };

  const deletePost = async (id) => { 
    try {
      await api.delete(`/blog/${id}`); 
      fetchData(); 
    } catch (error) {
      alert("删除文章失败");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '50px', marginTop: '20px' }}>
        
        {/* --- 管理 Projects --- */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px' }}>
          <h3>Manage Projects</h3>
          <form onSubmit={addProject} style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Title" 
              value={pForm.title} 
              onChange={e => setPForm({...pForm, title: e.target.value})} 
              required 
              style={{ display: 'block', width: '100%', marginBottom: '5px', padding: '8px' }} 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={pForm.description} 
              onChange={e => setPForm({...pForm, description: e.target.value})} 
              required 
              style={{ display: 'block', width: '100%', marginBottom: '5px', padding: '8px' }} 
            />
            <input 
              type="text" 
              placeholder="Live URL (Optional)" 
              value={pForm.liveUrl} 
              onChange={e => setPForm({...pForm, liveUrl: e.target.value})} 
              style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} 
            />
            <button type="submit" style={{ padding: '8px 15px' }}>Add Project</button>
          </form>
          <ul style={{ paddingLeft: '20px' }}>
            {projects.map(p => (
              <li key={p._id} style={{ marginBottom: '5px' }}>
                <strong>{p.title}</strong> 
                <button onClick={() => deleteProject(p._id)} style={{ color: 'red', marginLeft: '10px' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* --- 管理 Blog --- */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px' }}>
          <h3>Manage Blog Posts</h3>
          <form onSubmit={addPost} style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Title" 
              value={bForm.title} 
              onChange={e => setBForm({...bForm, title: e.target.value})} 
              required 
              style={{ display: 'block', width: '100%', marginBottom: '5px', padding: '8px' }} 
            />
            <textarea 
              placeholder="Content" 
              value={bForm.content} 
              onChange={e => setBForm({...bForm, content: e.target.value})} 
              required 
              style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', height: '80px' }} 
            />
            <button type="submit" style={{ padding: '8px 15px' }}>Add Post</button>
          </form>
          <ul style={{ paddingLeft: '20px' }}>
            {posts.map(post => (
              <li key={post._id} style={{ marginBottom: '5px' }}>
                <strong>{post.title}</strong> 
                <button onClick={() => deletePost(post._id)} style={{ color: 'red', marginLeft: '10px' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Admin;