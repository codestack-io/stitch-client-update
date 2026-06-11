import { Navigate } from "react-router";
import UseAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";

const RoleRoute = ({ children, allowedRole }) => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = useUserRole(user?.email);

  if (loading || isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role !== allowedRole) return <Navigate to="/" />;

  return children;
};

export default RoleRoute;