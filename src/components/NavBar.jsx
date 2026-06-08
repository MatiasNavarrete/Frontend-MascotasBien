import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">🐾 Mascotas Bien</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/reportar" className="btn-report">Reportar Mascota</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;