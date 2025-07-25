import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); //  
  const navigate = useNavigate();

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // ⬇️ Fetch user on mount if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (token && !user) {
        try {
          const res = await API.get("/auth/profile");
          setUser(res.data.user);
        } catch (err) {
          console.error(" Failed to fetch profile:", err);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);