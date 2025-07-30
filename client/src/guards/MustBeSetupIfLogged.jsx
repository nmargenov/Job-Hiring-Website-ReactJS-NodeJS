import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const MustBeSetupIfLogged = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && !user.isSetup) {
    return <Navigate to="/profile-setup" />;
  }
  return children ? children : <Outlet />;
};