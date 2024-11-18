import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function isAuthenticated() {
  const authToken = Cookies.get("auth_token");
  return !!authToken;
}

export function hasRole(requiredRoles) {
  try {
    const user = JSON.parse(Cookies.get("user") || "{}");
    return user.role && requiredRoles.includes(user.role);
  } catch {
    return false;
  }
}

export function PrivateRoute({ children, requiredRole }) {
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (!hasRole(roles)) {
    return (
      <div className="container-acesso-negado">
        <div className="acesso-negado">Acesso Negado</div>
      </div>
    );
  }

  return children;
}
