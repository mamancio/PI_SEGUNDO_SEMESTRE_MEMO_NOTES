import { useContext, useState } from "react";
import { BlocContext } from "../../Context/BlocContext";
import "./BlocForm.css";

function BlocForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { keyId, setKeyId, CreateNote } = useContext(BlocContext);

  const HandleSubmit = (e) => {
    e.preventDefault();
    CreateNote({
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <section>
      <h1 className="form_title">Suas notas:</h1>

      <form className="form" onSubmit={HandleSubmit}>
        <input
          className="form_input"
          placeholder="Título da sua nota aqui"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <textarea
          className="form_textarea"
          placeholder="Escreva sua nota aqui "
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <button className="form_button">Salvar nota</button>
      </form>
    </section>
  );
}

export default BlocForm;