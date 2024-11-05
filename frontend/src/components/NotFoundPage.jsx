import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page-box">
      <h1>404</h1>
      <h2>Oops!, Página não encontrada!</h2>
      <p>A página que você procura pode estar temporariamente indisponível ou não existir.</p>
      <Link to="/">Voltar para a página principal.</Link>
    </div>
  );
}

export default NotFoundPage;
