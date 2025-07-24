import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute({ children, allowedRoles, requiredRole }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const userRole = useSelector((state) => state.auth.role)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  const isAuthorized =
    (requiredRole && userRole === requiredRole) ||
    (allowedRoles && allowedRoles.includes(userRole)) ||
    (!requiredRole && !allowedRoles)

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />
  }

  return children ? children : <Outlet />
}
