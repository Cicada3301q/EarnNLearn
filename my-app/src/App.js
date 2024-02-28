import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProfileSelect from './ProfileSelect';
import ProfileBalance from './ProfileBalance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<ProfileSelect />} />
        <Route path="/profile-balance/:id" element={<ProfileBalance />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
