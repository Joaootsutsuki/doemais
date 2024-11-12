import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navegation";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AdminPage from "./components/AdminPage";
import SobrePage from "./components/SobrePage";
import ResetPasswordForm from "./components/ResetPasswordForm";
import NotFoundPage from "./components/NotFoundPage";
import CadastroForm from "./components/CadastroForm";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole={["admin"]}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute redirectTo="/">
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute redirectTo="/">
                <ResetPasswordForm />
              </PublicRoute>
            }
          />
          <Route
            path="/cadastro"
            element={
              <PublicRoute redirectTo="/">
                <CadastroForm />
              </PublicRoute>
            }
          />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function Layout({ children }) {
  const location = useLocation();

  const showNavBar = ["/", "/admin", "/sobre"].includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      {children}
    </>
  );
}

export default App;
