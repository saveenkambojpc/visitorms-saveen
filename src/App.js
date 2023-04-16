import logo from './logo.svg';
import './App.css';
import { Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication';
import Unauth from './pages/Unauth';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Routes>
      <Route index element={<Authentication />} />

      <Route path="create_visit" element={<PrivateRoute>This is Create Visit</PrivateRoute>} />
      <Route path="display_visitor" element={<PrivateRoute>This is Display  </PrivateRoute>} />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route path="unauth" element={<Unauth />}/>
     
    </Routes>

  );
}
