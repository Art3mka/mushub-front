import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { role } = useSelector((state) => state.auth);

  if (role !== "ADMIN") {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;
