import { Routes, Route } from "react-router-dom";
import Landing from "../pages/landing";
import Login from "../pages/login";
import Register from "../pages/register";
import ChangePassword from "../pages/change-password";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path ="/change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default AppRoutes;