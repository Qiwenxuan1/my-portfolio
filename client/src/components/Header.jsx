import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  const navStyle = {
    display: 'flex', gap: '25px', padding: '18px 40px', 
    background: '#ffffff', alignItems: 'center', 
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100
  };
  const linkStyle = { color: '#475569', fontWeight: '500', fontSize: '16px' };
  const logoStyle = { color: '#1e293b', fontSize: '22px', fontWeight: 'bold', textDecoration: 'none' };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>My Portfolio</Link>
      <div style={{ display: 'flex', gap: '25px' }}>
        <Link to="/projects" style={linkStyle}>Projects</Link>
        <Link to="/blog" style={linkStyle}>Blog</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/admin" style={{ ...linkStyle, color: '#3b82f6', fontWeight: 'bold' }}>Admin Dashboard</Link>
            <button onClick={handleLogout} style={{ padding: '8px 16px', fontSize: '14px' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={{ ...linkStyle, background: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '8px' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Header;