import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
