import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProfileSelect from './ProfileSelect';
import ProfileBalance from './ProfileBalance';
import ProfileChores from './ProfileChores';
import ChoreCreation from './ChoreCreation';
import RedeemRequest from './RedeemRequest';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<ProfileSelect />} />
        <Route path="/profile-balance/:id" element={<ProfileBalance />} />
        <Route path="/profile-chores/:id" element={<ProfileChores />} />
        <Route path="/chore-creation" element={<ChoreCreation />} />
        <Route path="/redeem-request" element={<RedeemRequest />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
