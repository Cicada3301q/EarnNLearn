import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSelect from "./pages/ProfileSelect";
import ProfileBalance from "./pages/ProfileBalance";
import ProfileChores from "./pages/ProfileChores";
import ChoreCreation from "./pages/ChoreCreation";
import RedeemRequest from "./pages/RedeemRequest";
import ProfileCreation from "./pages/ProfileCreation";
import BabySitter from "./pages/BabySitter";
import HeaderBanner from "./components/HeaderBanner";
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
          <Route path="/profile-chores/:childId" element={<ProfileChores />} />
          <Route path="/create-chore/:childId" element={<ChoreCreation />} />
          <Route path="/redeem-request" element={<RedeemRequest />} />
          <Route path="/add-profile" element={<ProfileCreation />} />
          <Route path="/babysitter" element={<BabySitter />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
