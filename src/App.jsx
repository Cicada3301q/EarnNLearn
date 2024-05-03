import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProfileSelect from "./pages/profile-select/ProfileSelect";
import ProfileBalance from "./pages/profile-balance/ProfileBalance";
import ProfileChores from "./pages/profile-chores/ProfileChores";
import ChoreCreation from "./pages/chore-creation/ChoreCreation";
import RedeemRequest from "./pages/redeem-request/RedeemRequest";
import ProfileCreation from "./pages/profile-creation/ProfileCreation";
import BabySitter from "./pages/baby-sitter/BabySitter";
import HeaderBanner from "./components/header-banner/HeaderBanner";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  const location = useLocation();
  const hideBannerOnPaths = ["/login", "/register", "/"];
  const showHeaderBanner = !hideBannerOnPaths.includes(location.pathname);

  return (
    <>
      {showHeaderBanner && <HeaderBanner />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profiles" element={<ProfileSelect />} />
          <Route path="/profile-balance/:id" element={<ProfileBalance />} />
          <Route path="/profile-chores/:id" element={<ProfileChores />} />
          <Route path="/chore-creation" element={<ChoreCreation />} />
          <Route path="/redeem-request" element={<RedeemRequest />} />
          <Route path="/add-profile" element={<ProfileCreation />} />
          <Route path="/babysitter" element={<BabySitter />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
