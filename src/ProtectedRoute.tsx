import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  isRegistered: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({ isRegistered, children }: ProtectedRouteProps) => {
  if (!isRegistered) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
