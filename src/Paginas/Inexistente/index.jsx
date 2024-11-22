import './Inexistente.css';
import question from "../../assets/img/question.svg"
import { NavLink } from "react-router-dom";

function Inexistente() {
    return (
      <>
      <div className="pg_ntFourdDiv">
        <img src={question} alt="note" className="pg_ntImg" />
        <h1>Página não encontrada!!</h1>
        <button className='pg_ntFound'>
        <NavLink className='link' to="/inicio"> Voltar ao ínicio. </NavLink></button>
      </div>
      </>
    );
  };
  
export default Inexistente;