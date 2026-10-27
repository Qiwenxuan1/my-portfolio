import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => { api.get('/blog').then(res => setPosts(res.data)); }, []);
  
  return (
    <div className="page-container">
      <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Blog Posts</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map(post => (
          <div key={post._id} className="card" style={{ padding: '30px' }}>
            <h2 style={{ marginTop: 0, marginBottom: '10px' }}>
              <Link to={`/blog/${post._id}`} style={{ color: '#1e293b' }}>{post.title}</Link>
            </h2>
            <p style={{ color: '#64748b', margin: 0 }}>By {post.author?.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;