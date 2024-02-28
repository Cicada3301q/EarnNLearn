import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; // Adjust the path based on your file structure
import Register from './Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Redirect to /login by default */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
