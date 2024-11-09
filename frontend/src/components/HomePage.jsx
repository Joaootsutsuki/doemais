import { bolsa, calendario, gotaSangue, banner, papeis } from "../assets/homePage"; //Imagens utilizadas no homepage

function HomePage() {
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
          <button className="cadastrar-btn">Meu Doe+</button>
        </div>
      </header>

      <main>
        <div className="box-btns-to-service">
          <div className="btns">
            <div className="btn">
              <img src={calendario} alt="Icone calendário" />
              <span>Agendar Doação</span>
            </div>
            <div className="btn">
              <img src={papeis} alt="Icone papeis" />
              <span>Cadastro de Doadores</span>
            </div>
            <div className="btn">
              <img src={bolsa} alt="Icone bolsa de sangue" />
              <span>Solicitar Bolsas</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
