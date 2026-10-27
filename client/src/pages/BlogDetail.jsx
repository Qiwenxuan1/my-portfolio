import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const { user } = useAuth();

  const fetchPost = () => { api.get(`/blog/${id}`).then(res => setData(res.data)); };
  useEffect(() => { fetchPost(); }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    await api.post(`/blog/${id}/comments`, { body: commentBody });
    setCommentBody(''); fetchPost(); // refresh
  };

  if (!data) return <h2>Loading...</h2>;
  return (
    <div>
      <h1>{data.post.title}</h1>
      <p>{data.post.content}</p>
      <hr />
      <h3>Comments</h3>
      {data.comments.map(c => <div key={c._id}><strong>{c.author?.username}:</strong> {c.body}</div>)}
      {user && (
        <form onSubmit={submitComment} style={{ marginTop: '20px' }}>
          <textarea value={commentBody} onChange={e => setCommentBody(e.target.value)} required />
          <br /><button type="submit">Add Comment</button>
        </form>
      )}
    </div>
  );
};
export default BlogDetail;