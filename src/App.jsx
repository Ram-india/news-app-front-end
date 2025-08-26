import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/Authcontext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Preference from "./pages/Preference";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import Emailogs from "./components/Emailogs";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/resetPassword";
import Navbar from "./components/Navbar"; // 
import SearchResults from "./pages/SearchResults";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="middle-left" />

      {/* Top Navbar is always visible if user is logged in */}
      {user && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard/search" element={<SearchResults/>} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/preferences"
          element={
            <PrivateRoute>
              <Preference />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/email-logs"
          element={
            <PrivateRoute>
              <Emailogs />
            </PrivateRoute>
          }
        />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard/home" />} />
      </Routes>
    </>
  );
};

export default App;