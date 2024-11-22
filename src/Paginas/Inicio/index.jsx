import Cabecalho from "../../Componentes/Cabecalho";
import note from "../../assets/img/note.svg"
import pencil from "../../assets/img/pencil.svg"
import conection from "../../assets/img/conection.svg"
import version from "../../assets/img/version.svg"
import "./Inicio.css"
import { NavLink } from "react-router-dom";

function Inicio() {
    return (
      <>
        <Cabecalho/>
        <div className="container" id="inicio_container">
          <div className="texto">
            <h3>Bem-Vindo ao</h3>
            <h1>Memo Notes</h1>
            <h5>Nossa missão é ajuda-lo na organização de seus projetos.</h5>
            <button className="create_note_btn">
              <NavLink className='link' to="/notas"> Criar nota →</NavLink>
            </button>
          </div>
          <img src={note} alt="note" className="note_img" />
        </div>

        <div className="container" id="container_apresentacao">
          <div className="apresentacao">
            <h1>Começe suas notas com a gente.</h1>
            <h5>Transforme suas ideias em realidade!
            Capture cada pensamento e faça anotações que impulsionam sua criatividade e organização.</h5>
            <div className="img_apresentacao">
              <div className="card">
                <h5 className="card_title">Se inspire</h5>
                <img src={pencil} alt="note" className="note_img" id="tras"/>
                <h6>A inspiração é a chave para a criatividade. Ela nos motiva a explorar novas ideias e nos ajuda a ver o mundo de maneiras diferentes.</h6>
              </div>
              <div className="card">
                <h5 className="card_title">Se conecte</h5>
                <img src={conection} alt="note" className="note_img" id="tras"/>   
                <h6>Conectar-se com outras pessoas enriquece nossas vidas. Trocar experiências e ideias amplia nossos horizontes e fortalece laços.</h6>
              </div>
              <div className="card">
                <h5 className="card_title">Se desenvolva</h5>
               <img src={version} alt="note" className="note_img" id="tras"/>
               <h6>O desenvolvimento pessoal é uma jornada de autoconhecimento. Investir em nós mesmos nos torna mais resilientes e prontos para novos desafios</h6>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  };
  
export default Inicio;