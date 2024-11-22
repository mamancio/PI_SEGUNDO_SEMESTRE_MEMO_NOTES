// import { useContext } from "react";
// import { BlocContext } from "../../Context/BlocContext";
// import "./BlocCard.css";

// function BlocCard({ note }) {
//   const { DeleteNote } = useContext(BlocContext);
//   return (
//     <section className="note">
//       <div className="div_note">
//         <h1 className="type">Titulo:</h1>
//         <h1 className="note_title">{note.titulo}</h1>
//         <h1 className="type">Conteúdo:</h1>
//         <p className="note_description">{note.conteudo}</p>
//       </div>
//       <div className="div_button">
//         <button className="edit_button" >
//           Editar Nota
//         </button>
//         <button className="delete_button" onClick={() => DeleteNote(note.id)}>
//           Deletar Nota
//         </button>
//       </div>
//     </section>
//   );
// }

// export default BlocCard;

import { useContext, useState } from "react";
import { BlocContext } from "../../Context/BlocContext";
import "./BlocCard.css";

function BlocCard({ note }) {
  const { DeleteNote, EditNote } = useContext(BlocContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    titulo: note.titulo,
    conteudo: note.conteudo,
  });

  const handleSave = () => {
    EditNote(note.id, editedNote);
    setIsEditing(false);
  };

  return (
    <section className="note">
      <div className="div_note">
        <h1 className="type">Titulo:</h1>
        {isEditing ? (
          <input
            className="note_input"
            type="text"
            value={editedNote.titulo}
            onChange={(e) =>
              setEditedNote((prev) => ({ ...prev, titulo: e.target.value }))
            }
          />
        ) : (
          <h1 className="note_title">{note.titulo}</h1>
        )}

        <h1 className="type">Conteúdo:</h1>
        {isEditing ? (
          <textarea
            className="note_textarea"
            value={editedNote.conteudo}
            onChange={(e) =>
              setEditedNote((prev) => ({ ...prev, conteudo: e.target.value }))
            }
          />
        ) : (
          <p className="note_description">{note.conteudo}</p>
        )}
      </div>
      <div className="div_button">
        {isEditing ? (
          <>
            <button className="save_button" onClick={handleSave}>
              Salvar
            </button>
            <button
              className="cancel_button"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button className="edit_button" onClick={() => setIsEditing(true)}>
            Editar Nota
          </button>
        )}
        <button className="delete_button" onClick={() => DeleteNote(note.id)}>
          Deletar Nota
        </button>
      </div>
    </section>
  );
}

export default BlocCard;
