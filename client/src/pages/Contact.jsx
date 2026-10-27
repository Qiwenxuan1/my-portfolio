import { useState } from 'react';
import api from '../services/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await api.post('/contact', form); setStatus('Message sent!'); setForm({ name: '', email: '', message: '' }); } 
    catch { setStatus('Error sending message'); }
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Contact Me</h2>
      {status && <p>{status}</p>}
      <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
      <textarea placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
      <button type="submit" style={{ width: '100%', padding: '10px' }}>Send</button>
    </form>
  );
};
export default Contact;