import React, { useRef, useState, useEffect } from "react";
import logotipo from "../assets/logotipo.png";

function Sidebar() {
  const navBarRef = useRef(null); // Referência para o elemento nav
  const overlayRef = useRef(null); // Referência para o overlay
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar se a navbar está aberta

  // Função para alternar a classe "open"
  const toggleNavBar = () => {
    setIsOpen(!isOpen); // Alterna o estado
  };

  // Função para fechar a navbar ao clicar no overlay
  const closeNavBar = () => {
    setIsOpen(false); // Fecha a navbar
  };

  // useEffect para adicionar/remover classes com base no estado
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
                <a href="#" className="nav-link">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="link">Dashboard</span>
                </a>
              </li>
              {/* Outros itens da lista */}
            </ul>
            <div className="bottom-content">
              <li className="list">
                <a href="#" className="nav-link">
                  <i className="bx bx-cog icon"></i>
                  <span className="link">Settings</span>
                </a>
              </li>
              <li className="list">
                <a href="#" className="nav-link">
                  <i className="bx bx-log-out icon"></i>
                  <span className="link">Logout</span>
                </a>
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
