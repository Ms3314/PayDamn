import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Payments from './pages/Payments';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
