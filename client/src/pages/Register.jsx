import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await api.post('/users/register', form); await login(form.email, form.password); navigate('/'); } 
    catch (err) { setError('Registration failed'); }
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div><input type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} /></div>
      <div><input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} /></div>
      <div><input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} /></div>
      <button type="submit" style={{ width: '100%', padding: '10px' }}>Register</button>
    </form>
  );
};
export default Register;