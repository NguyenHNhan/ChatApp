import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './components/layout/login';
import Cookies from 'js-cookie';
import SignUpPage from './components/layout/signup';
import HomePage from './components/layout/Homepage';

function App() {

  const token = Cookies.get('token');

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/signup" element={token ? <Navigate to="/" /> : <SignUpPage />} />
      <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />

    </Routes>


  );
}

export default App;
