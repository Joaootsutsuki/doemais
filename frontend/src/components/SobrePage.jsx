import banner from "../assets/sobre-banner.png";
import { Link } from "react-router-dom";

function SobrePage() {
  return (
    <div className="sobre-container">
      <div className="content">
        <h1>Meu DOE+</h1>
        <p>
          O <span>Meu DOE+</span> é o espaço dedicado para doadores e hospitais se cadastrarem e gerenciarem
          suas informações. Doadores podem acompanhar seu histórico de doações, agendar novas coletas e
          receber lembretes automáticos. Já os hospitais têm acesso a uma plataforma exclusiva para solicitar
          bolsas de sangue, verificar estoques e acompanhar o status das suas solicitações.
        </p>
        <p>
          Seja você um doador ou uma instituição, o Meu DOE+ facilita sua conexão com o ciclo da doação e
          salva vidas com mais eficiência!
        </p>
        <div className="buttons">
          <Link to="/login" className="acessar-btn">
            Acessar
          </Link>
          <Link to="/create-account" className="cadastrar-btn">
            Cadastrar
          </Link>
        </div>
      </div>
      <div className="sobre-image">
        <img src={banner} alt="Banner" />
      </div>
    </div>
  );
}

export default SobrePage;
