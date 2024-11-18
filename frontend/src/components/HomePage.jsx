import {
  bolsa,
  calendario,
  gotaSangue,
  banner,
  papeis,
  parceiro01,
  parceiro02,
  parceiro03,
  parceiro04,
  parceiro05,
  logotipo,
  hospital,
  minhaAgenda,
  list,
} from "../assets/homePage"; //Imagens utilizadas no homepage

import ChartArea from "./AreaChart";
import ChartDonut from "./DonutChart";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { hasRole } from "./PrivateRoute";

function HomePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userCookieData = Cookies.get("user");
    if (userCookieData) {
      setUserData(userCookieData);
    }
  }, []);
  return (
    <div className="home-page-container">
      <header>
        <div className="background-color"></div>
        <div className="home-page-banner">
          <img src={banner} alt="Banner" />
        </div>
        <div className="content-box">
          <img src={gotaSangue} alt="Icone gota de sangue" />
          <p>
            O <span>DOE+</span> conecta doadores de sangue e hospitais, garantindo um fluxo eficiente de
            doações e salvando vidas. Com nossa plataforma, doar e gerenciar bolsas de sangue nunca foi tão
            simples e seguro.
          </p>
          <p>
            "Cada <span>gota</span> conta. Doe sangue, <span>salve vidas!</span>"
          </p>
          <p className="label-button">
            <u>Faça Parte do:</u>
          </p>
          <Link to="/sobre" className="cadastrar-btn">
            Meu Doe+
          </Link>
        </div>
      </header>

      <main>
        <div className="box-btns-to-service">
          <div className="btns">
            {hasRole(["doador"]) && (
              <Link to="/agendar">
                <div className="btn">
                  <img src={calendario} alt="Icone calendário" />
                  <span>Agendar Doação</span>
                </div>
              </Link>
            )}
            {hasRole(["doador"]) && (
              <Link to="/minha-agenda">
                <div className="btn">
                  <img src={minhaAgenda} alt="Icone calendário" />
                  <span>Minha Agenda</span>
                </div>
              </Link>
            )}
            {hasRole(["admin"]) && (
              <Link to="/cadastrar-admin">
                <div className="btn">
                  <img src={papeis} alt="Icone papeis" />
                  <span>Cadastrar Admin</span>
                </div>
              </Link>
            )}
            {hasRole(["admin"]) && (
              <Link to="/instituicoes/pendentes">
                <div className="btn">
                  <img src={hospital} alt="Icone papeis" />
                  <span>Status das Instituições</span>
                </div>
              </Link>
            )}
            {hasRole(["instituicao"]) && (
              <Link to="/solicitar-bolsa">
                <div className="btn">
                  <img src={bolsa} alt="Icone bolsa de sangue" />
                  <span>Solicitar Bolsas</span>
                </div>
              </Link>
            )}
            {hasRole(["instituicao"]) && (
              <Link to="/listar-solicitacoes">
                <div className="btn">
                  <img src={list} alt="Icone lista" />
                  <span>Ver Solicitações</span>
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="charts-container">
          <div className="chart">
            <ChartArea />
            <span>
              <strong>Total:</strong> 1000L
            </span>
          </div>
          <div className="chart">
            <ChartDonut />
          </div>
        </div>

        <div className="parceiros-container">
          <h1>Parceiros</h1>
          <div className="parceiros-boxs">
            <div className="box">
              <img src={parceiro01} alt="Logotipo Parceiros" />
            </div>
            <div className="box">
              <img src={parceiro02} alt="Logotipo Parceiros" />
            </div>
            <div className="box">
              <img src={parceiro03} alt="Logotipo Parceiros" />
            </div>
            <div className="box">
              <img src={parceiro04} alt="Logotipo Parceiros" />
            </div>
            <div className="box">
              <img src={parceiro05} alt="Logotipo Parceiros" />
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="logo-container">
            <img src={logotipo} alt="Doe+" className="logo-icon" />
          </div>
          <div className="contact-info">
            <p>(49) 3533-4900</p>
            <p>SC-135, km 125 - S/n - Campo Experimental, Videira - SC, 89564-590</p>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon instagram" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
