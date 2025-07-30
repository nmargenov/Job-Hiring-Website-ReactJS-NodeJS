import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const MustBeGuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
};