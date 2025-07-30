import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const MustBeLoggedAndNotSetup = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (user.isSetup) {
    return <Navigate to="/profile" />;
  }
  return children ? children : <Outlet />;
};