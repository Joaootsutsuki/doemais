import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("auth_token");
    //navigate("/login");
  };

  return <button onClick={handleLogout}>Sair</button>;
}

export default Logout;
