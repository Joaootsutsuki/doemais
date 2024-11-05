import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function isAuthenticated() {
  const token = Cookies.get("auth_token");
  return !!token;
}

function hasRole(requiredRoles) {
  const user = Cookies.get("user");
  if (user) {
    const userData = JSON.parse(user);
    return requiredRoles.includes(userData.role);
  }
  return false;
}

function PrivateRoute({ children, requiredRole }) {
  const isLoggedIn = isAuthenticated();
  const hasRequiredRole = hasRole(requiredRole);

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (!hasRequiredRole)
    return (
      <div className="container-acesso-negado">
        <div className="acesso-negado">Acesso Negado</div>
      </div>
    );

  return children;
}

export default PrivateRoute;
