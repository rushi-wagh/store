import { Routes, Route } from "react-router-dom";
import Landing from "../pages/landing";
import Login from "../pages/login";
import Register from "../pages/register";
import ChangePassword from "../pages/change-password";
import OwnerDashboard from "../pages/owner-dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/admin-dashboard";
import Dashboard from "../pages/user-dashboard";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path ="/change-password" element={
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      } />
      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute  roles={["STORE_OWNER"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/admin-dashboard" element={
      <ProtectedRoute roles={["SYSTEM_ADMINISTRATOR"]}>
        <AdminDashboard />
      </ProtectedRoute>
    } /> 
    <Route path ="/dashboard" element={
        <ProtectedRoute roles={["USER"]}>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
    
  );
};

export default AppRoutes;