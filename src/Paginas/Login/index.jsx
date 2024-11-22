import React, { useState } from "react";
import './Login.css';
import login from '../../assets/img/login.svg';
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Armazena o token no localStorage
        navigate("/"); // Redireciona para a página inicial após o login
      } else {
        const errorData = await response.json();
        setError(errorData.error); // Exibe o erro se houver
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login, tente novamente.");
    }
  };

  return (
    <>
      <div className="container" id="login_container">
        <div className="login_card">
          <h1>Seja bem-vindo novamente!</h1>
          <h3>Seja criativo e produtivo com o Memo Notes.</h3>
          
          {error && <p className="error_message">{error}</p>} {/* Exibe mensagens de erro */}

          <h5>Digite seu e-mail:</h5>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="email" 
            placeholder="Coloque seu e-mail aqui."
          />
          <h5>Digite sua senha: </h5>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
            className="password" 
            placeholder="Coloque sua senha aqui."
          />
          
          <button className="forget">Esqueceu sua senha?</button>
          <button className="login_btn" onClick={handleLogin}>Entrar</button>

          <h5>Não tem um cadastro?</h5>
          <NavLink to="/cadastro"> 
            <button className="register">Registre agora!</button> 
          </NavLink>
        </div>

        <div className="login_txt">
          <img src={login} alt="login" className="login_img" />
          <h2>Torne seu trabalho simples, organizado e fácil com o Memo Notes.</h2>
        </div>
        <div className="triangle"></div>
      </div>
    </>
  );
};

export default Login;
