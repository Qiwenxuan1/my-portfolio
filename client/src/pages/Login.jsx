import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(email, password); navigate('/admin'); } catch (err) { setError('Invalid email or password'); }
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <form onSubmit={handleSubmit} className="card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: '25px', color: '#1e293b' }}>Welcome Back</h2>
        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
        
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Login</button>
      </form>
    </div>
  );
};
export default Login;