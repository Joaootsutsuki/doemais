import React, { useRef, useState, useEffect } from "react";
import logotipo from "../assets/logotipo.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import config from "../config/urlConfig";
import { hasRole } from "./PrivateRoute"; // Importando o método para verificar permissões de usuário

function Sidebar() {
  const navBarRef = useRef(null);
  const overlayRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavBar = () => {
    setIsOpen(false);
  };

  const Logout = () => {
    Cookies.remove("user", {
      expires: 1,
      path: "/",
      domain: config.webDomain,
      secure: true,
      sameSite: "None",
    });
    Cookies.remove("auth_token", {
      expires: 1,
      path: "/",
      domain: config.webDomain,
      secure: true,
      sameSite: "None",
    });
  };

  useEffect(() => {
    const navBar = navBarRef.current;
    const overlay = overlayRef.current;

    if (isOpen) {
      navBar.classList.add("open");
      overlay.classList.add("active");
    } else {
      navBar.classList.remove("open");
      overlay.classList.remove("active");
    }
  }, [isOpen]);

  return (
    <>
      <nav ref={navBarRef}>
        <div className="logo">
          <i className="bx bx-menu menu-icon" onClick={toggleNavBar}></i>
          <div className="slogan">
            <img src={logotipo} alt="Logotipo" />
            <h2>Doe sangue, doe vida!</h2>
          </div>
        </div>
        <div className="sidebar">
          <div className="logo">
            <i className="bx bx-menu menu-icon" onClick={toggleNavBar}></i>
            <img src={logotipo} alt="Logotipo" />
          </div>
          <div className="sidebar-content">
            <ul className="lists">
              <li className="list">
                <Link to="/" className="nav-link">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="link">Home</span>
                </Link>
              </li>

              {hasRole(["doador"]) && (
                <li className="list">
                  <Link to="/agendar" className="nav-link">
                    <i className="bx bx-calendar icon"></i>
                    <span className="link">Agendar Doação</span>
                  </Link>
                </li>
              )}
              {hasRole(["doador"]) && (
                <li className="list">
                  <Link to="/minha-agenda" className="nav-link">
                    <i className="bx bx-calendar-check icon"></i>
                    <span className="link">Minha Agenda</span>
                  </Link>
                </li>
              )}
              {hasRole(["admin"]) && (
                <li className="list">
                  <Link to="/cadastrar-admin" className="nav-link">
                    <i className="bx bx-user-plus icon"></i>
                    <span className="link">Cadastrar Admin</span>
                  </Link>
                </li>
              )}
              {hasRole(["admin"]) && (
                <li className="list">
                  <Link to="/instituicoes/pendentes" className="nav-link">
                    <i className="bx bxs-institution icon"></i>
                    <span className="link">Status das Instituições</span>
                  </Link>
                </li>
              )}
              {hasRole(["instituicao"]) && (
                <li className="list">
                  <Link to="/solicitar-bolsa" className="nav-link">
                    <i className="bx bx-send icon"></i>
                    <span className="link">Solicitar Bolsas</span>
                  </Link>
                </li>
              )}
              {hasRole(["instituicao"]) && (
                <li className="list">
                  <Link to="/listar-solicitacoes" className="nav-link">
                    <i className="bx bx-list-ul icon"></i>
                    <span className="link">Minhas Solicitações</span>
                  </Link>
                </li>
              )}
            </ul>
            <div className="bottom-content">
              <li className="list">
                <Link to="/login" className="nav-link" onClick={() => Logout()}>
                  <i className="bx bx-log-out icon"></i>
                  <span className="link">Logout</span>
                </Link>
              </li>
            </div>
          </div>
        </div>
      </nav>
      <section className="overlay" ref={overlayRef} onClick={closeNavBar}></section>
    </>
  );
}

export default Sidebar;
