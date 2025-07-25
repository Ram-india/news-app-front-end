import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/Authcontext";
import { useEffect } from "react";
import { toast, Toaster } from 'react-hot-toast';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Preference from "./pages/Preference";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashBoardLayout";
import Emailogs from "./components/Emailogs";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/resetPassword';


const App = () => {
  const { user } = useAuth();


  return (
    <>
   <Toaster position="middle-left" />
   <Routes>
  {/* Public Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />

  {/* Protected Dashboard Routes */}
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    }
  >
    <Route path="home" element={<Home />} />
    <Route path="preferences" element={<Preference />} />
    <Route path="profile" element={<Profile />} />
    <Route path="edit-profile" element={<EditProfile />} />
    <Route path="email-logs" element={<Emailogs />} />
  </Route>

  {/* Redirect root to dashboard */}
  <Route path="/" element={<Navigate to="/dashboard/home" />} />
</Routes>
    </>
  );
};

export default App;