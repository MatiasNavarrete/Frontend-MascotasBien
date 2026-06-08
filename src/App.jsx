import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Reportar from './pages/Reportar'; // Asegúrate de que el nombre coincida
import './styles/variable.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reportar" element={<Reportar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;