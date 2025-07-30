import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const MustBeSetupAndLogged = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } if (!user.isSetup) {
    return <Navigate to="/profile-setup" />;
  }
  return children ? children : <Outlet />;
};