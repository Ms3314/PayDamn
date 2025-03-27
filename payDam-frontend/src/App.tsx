import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Payments from './pages/Payments';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import { useStore } from './Zustand/store';
import { useEffect, useState } from 'react';
import { isValidToken } from './helpers/isValidToken';

function App() {
  const [doesTokenExist , setDoesTokenExist] = useState(false);
  const token = localStorage.getItem('token');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setToken = useStore((state:any) => state.setToken);
  // const removeToken = useStore((state:any) => state.removeToken);
  useEffect(() => {
    checkTokenAndSetState(token);
  }, [token]);
  
  
  async function checkTokenAndSetState(token: string | null) {
    if (token && await isValidToken()) {
      setToken(token);
      setDoesTokenExist(true);
    } else {
      setDoesTokenExist(false);
    }
  }
  

  if (doesTokenExist) {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </Router>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App
