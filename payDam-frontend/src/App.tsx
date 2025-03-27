import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Payments from './pages/Payments';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';

function App() {
  const token = localStorage.getItem('token');
  if (token) {
    
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App
