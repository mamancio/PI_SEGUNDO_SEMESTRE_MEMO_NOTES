// import React from "react";
// import "./Cadastro.css"
// import { NavLink, useNavigate } from "react-router-dom";

// function Cadastro() {
//     return (
//       <>
//         <div className="container" id="container_cadastro">
//           <div className="register_card">
//             <h1>Bora se registrar?</h1>
//             <h5>Qual seu nome?</h5>
//             <input type="name" placeholder="Digite seu nome aqui."/>
//             <h5>Digite seu melhor e-mail:</h5>
//             <input type="email" name="" id="" placeholder="Digite seu e-mail"/>
//             <h5>Crie uma senha forte:</h5>
//             <input type="password" name="" id="" placeholder="Crie uma senha."/>
//             <h5>Repita essa senha:</h5>
//             <input type="password" name="" id="" placeholder="Repita sua senha."/>
//             <button type="button">Registrar</button>
//           </div>
//           <div className="triangle_cadastro"></div>
//         </div>
//       </>
//     );
//   };
  
// export default Cadastro;

import React, { useState } from "react";
import "./Cadastro.css";
import { useNavigate } from "react-router-dom";

function Cadastro() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmSenha: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Usuário registrado com sucesso!");
                navigate("/login");
            } else {
                const error = await response.json();
                alert(error.error || "Erro ao registrar.");
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
            alert("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div className="container" id="container_cadastro">
            <div className="register_card">
                <h1>Bora se registrar?</h1>
                <h5>Qual seu nome?</h5>
                <input
                    type="text"
                    name="nome"
                    placeholder="Digite seu nome aqui."
                    onChange={handleInputChange}
                />
                <h5>Digite seu melhor e-mail:</h5>
                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    onChange={handleInputChange}
                />
                <h5>Crie uma senha forte:</h5>
                <input
                    type="password"
                    name="senha"
                    placeholder="Crie uma senha."
                    onChange={handleInputChange}
                />
                <h5>Repita essa senha:</h5>
                <input
                    type="password"
                    name="confirmSenha"
                    placeholder="Repita sua senha."
                    onChange={handleInputChange}
                />
                <button type="button" onClick={handleRegister}>
                    Registrar
                </button>
            </div>
            <div className="triangle_cadastro"></div>
        </div>
    );
}

export default Cadastro;
