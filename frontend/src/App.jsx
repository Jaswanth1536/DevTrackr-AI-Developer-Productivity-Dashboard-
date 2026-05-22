import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Commits from "./pages/Commits";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          {/* Protected Main Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          {/* Fallback Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/commits" element={<Commits />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
