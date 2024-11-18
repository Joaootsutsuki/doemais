import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navegation";
import LoginForm from "./components/LoginForm";
import { PrivateRoute } from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SobrePage from "./components/SobrePage";
import ResetPasswordForm from "./components/ResetPasswordForm";
import NotFoundPage from "./components/NotFoundPage";
import CadastroForm from "./components/CadastroForm";
import HomePage from "./components/HomePage";
import AgendarDoacao from "./components/AgendarDoacaoPage";
import SolicitarBolsa from "./components/SolicitarBolsa";
import StatusInstituicoes from "./components/StatusInstituicoes";
import MinhaAgenda from "./components/MinhaAgenda";
import StatusSolicitacoes from "./components/StatusSolicitacoes";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
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
          <Route
            path="/agendar"
            element={
              <PrivateRoute requiredRole={["admin", "doador"]}>
                <AgendarDoacao />
              </PrivateRoute>
            }
          />
          <Route
            path="/solicitar-bolsa"
            element={
              <PrivateRoute requiredRole={["instituicao"]}>
                <SolicitarBolsa />
              </PrivateRoute>
            }
          />
          <Route
            path="/listar-solicitacoes"
            element={
              <PrivateRoute requiredRole={["instituicao"]}>
                <StatusSolicitacoes />
              </PrivateRoute>
            }
          />

          <Route
            path="/instituicoes/pendentes"
            element={
              <PrivateRoute requiredRole={["admin"]}>
                <StatusInstituicoes />
              </PrivateRoute>
            }
          />
          <Route
            path="/minha-agenda"
            element={
              <PrivateRoute requiredRole={["doador"]}>
                <MinhaAgenda />
              </PrivateRoute>
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

  const showNavBar = [
    "/",
    "/admin",
    "/sobre",
    "/solicitar-bolsa",
    "/agendar",
    "/instituicoes/pendentes",
    "/minha-agenda",
    "/listar-solicitacoes",
  ].includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      {children}
    </>
  );
}

export default App;
