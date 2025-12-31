import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function AdminProtectedRoute({ children }) {
  const { admin } = useContext(AppContext);

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
