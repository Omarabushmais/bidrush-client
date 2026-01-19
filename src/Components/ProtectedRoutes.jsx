import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.clear();
          navigate("/login", { replace: true });
        }
      } catch {
        localStorage.clear();
        navigate("/login", { replace: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token, navigate]);


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {

    if (!role) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    return role === "admin" ? (
      <Navigate to="/admin-dashboard" replace />
    ) : (
      <Navigate to="/user-dashboard" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;