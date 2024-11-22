import { createContext, useEffect, useState } from "react";

// Criação do contexto
export const BlocContext = createContext();

function BlocContextProvider(props) {
    const [notes, setNotes] = useState([]);
    const [keyId, setKeyId] = useState(4); // Definido para controle local

    // Função para criar uma nova nota
    async function CreateNote(note) {
        try {
            const response = await fetch("http://localhost:5000/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    titulo: note.title,
                    conteudo: note.description,
                }),
            });

            if (response.ok) {
                const newNote = await response.json();
                setNotes((prevNotes) => [...prevNotes, newNote]);
            } else {
                console.error("Erro ao criar a nota");
            }
        } catch (error) {
            console.error("Erro de conexão ao criar a nota:", error);
        }
    }

    // Função para deletar uma nota
    async function DeleteNote(noteId) {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setNotes(notes.filter((note) => note.id !== noteId));
            } else {
                console.error("Erro ao deletar a nota");
            }
        } catch (error) {
            console.error("Erro de conexão ao deletar a nota:", error);
        }
    }

    // Função para editar uma nota
    async function EditNote(id, updatedNote) {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedNote),
            });

            if (response.ok) {
                const updatedNotes = notes.map((note) =>
                    note.id === id ? { ...note, ...updatedNote } : note
                );
                setNotes(updatedNotes);
            } else {
                console.error("Erro ao editar a nota.");
            }
        } catch (error) {
            console.error("Erro de conexão ao editar a nota:", error);
        }
    }

    // UseEffect para carregar as notas ao iniciar
    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await fetch("http://localhost:5000/api/notes");
                if (response.ok) {
                    const data = await response.json();
                    setNotes(data);
                } else {
                    console.error("Erro ao carregar as notas");
                }
            } catch (error) {
                console.error("Erro de conexão ao carregar as notas:", error);
            }
        }

        fetchNotes();
    }, []);

    return (
        <BlocContext.Provider
            value={{
                keyId,
                setKeyId,
                notes,
                DeleteNote,
                CreateNote,
                EditNote, // Adicionado ao contexto
            }}
        >
            {props.children}
        </BlocContext.Provider>
    );
}

export default BlocContextProvider;
