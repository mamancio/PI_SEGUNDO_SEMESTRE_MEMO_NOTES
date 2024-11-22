import BlocCard from "../BlocCard/index";
import { useContext } from "react";
import { BlocContext } from "../../Context/BlocContext";
import "./BlocList.css"

function BlocList() {
  const {notes} = useContext(BlocContext);

  if (notes.length === 0) {
    return <h2 className="note_empty">Sem notas salvas.</h2>;
  }
  
  return (
      <>
        <h1 className="save_title">Notas Salvas:</h1>
        <section className="note_section">
          {notes.map((note) => (
            <BlocCard key={note.id} note={note}/>
          ))}
        </section>
    </>
  );
}
export default BlocList;

