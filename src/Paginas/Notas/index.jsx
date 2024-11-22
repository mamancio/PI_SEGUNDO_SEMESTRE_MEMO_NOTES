import BlocList from '../../Componentes/BlocList/index';
import BlocForm from '../../Componentes/BlocForm/index';
import Cabecalho from '../../Componentes/Cabecalho/index';
import './Notas.css';

function Notas() {
  return (
    <>
      <Cabecalho/>
      <BlocForm/>
      <BlocList/>
      <div className="space"></div>
    </>
  );
};

export default Notas;