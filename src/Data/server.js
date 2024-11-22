const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = '7b5df7c6e8b6e1dfcf90e7e9d8f6c5b7a1d9f0b8e2e3f7c6a7d8e9f0a1b2c3d4';

const app = express();
const port = 5000;

// Configurações básicas
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Conexão com o banco de dados
const conexao = mysql.createConnection({
    user: 'root',
    password: '12345',
    host: 'localhost',
    port: 3306,
    database: 'sistema_notas',
    debug: true 
});

conexao.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }
    console.log("Conexão com o banco de dados estabelecida!");
});

// Rotas para Notas
app.post('/api/notes', (req, res) => {
    console.log("Recebendo requisição POST em /api/notes");
    console.log("Corpo da requisição:", req.body);

    const { titulo, conteudo } = req.body;

    if (!titulo || !conteudo) {
        console.log("Erro: Título ou conteúdo ausente.");
        return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
    }

    const query = 'INSERT INTO notas (titulo, conteudo) VALUES (?, ?)';
    conexao.query(query, [titulo, conteudo], (err, results) => {
        if (err) {
            console.error("Erro ao executar a query de inserção:", err);
            return res.status(500).json({ error: 'Erro ao criar a nota.' });
        }
        console.log("Nota criada com sucesso! ID da nota:", results.insertId);
        res.status(201).json({ id: results.insertId, titulo, conteudo });
    });
});

app.get('/api/notes', (req, res) => {
    console.log("Recebendo requisição GET em /api/notes");
    const query = 'SELECT * FROM notas';
    conexao.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao executar a query de seleção:", err);
            return res.status(500).json({ error: 'Erro ao recuperar notas.' });
        }
        res.json(results);
    });
});

app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;

    // Verificar se o título e o conteúdo foram enviados
    if (!titulo || !conteudo) {
        console.log("Erro: Título ou conteúdo ausente.");
        return res.status(400).json({ error: "Título e conteúdo são obrigatórios." });
    }

    // Query para atualizar a nota
    const query = 'UPDATE notas SET titulo = ?, conteudo = ? WHERE id = ?';
    conexao.query(query, [titulo, conteudo, id], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar a nota:", err);
            return res.status(500).json({ error: "Erro ao atualizar a nota." });
        }

        // Verificar se alguma linha foi afetada
        if (results.affectedRows === 0) {
            console.log(`Nenhuma nota encontrada para o ID ${id}.`);
            return res.status(404).json({ error: "Nota não encontrada." });
        }

        console.log(`Nota com ID ${id} atualizada com sucesso.`);
        res.status(200).json({ id, titulo, conteudo });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Recebendo requisição DELETE para ID ${id}`);
    const query = 'DELETE FROM notas WHERE id = ?';
    conexao.query(query, [id], (err, results) => {
        if (err) {
            console.error("Erro ao executar a query de exclusão:", err);
            return res.status(500).json({ error: 'Erro ao deletar a nota.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Nota não encontrada.' });
        }
        console.log(`Nota com ID ${id} deletada com sucesso.`);
        res.status(204).send();
    });
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [rows] = await conexao.promise().query("SELECT * FROM usuario WHERE email = ?", [email]);

        if (rows.length === 0) {
            console.log("Usuário não encontrado com o email:", email);
            return res.status(401).json({ error: "Credenciais inválidas. Usuário não encontrado." });
        }

        const usuario = rows[0];

        if (senha !== usuario.senha) {
            console.log("Senha incorreta para o usuário:", email);
            return res.status(401).json({ error: "Senha incorreta." });
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, email: usuario.email },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        console.log("Login bem-sucedido. Token gerado:", token);
        return res.json({ token });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});









// Rota para registrar um novo usuário
app.post('/api/register', async (req, res) => {
    const { nome, email, senha, confirmSenha } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !senha || !confirmSenha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Verificar se as senhas coincidem
    if (senha !== confirmSenha) {
        return res.status(400).json({ error: "As senhas não coincidem." });
    }

    try {
        // Verificar se o email já está cadastrado
        const [existingUser] = await conexao.promise().query(
            "SELECT * FROM usuario WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "E-mail já cadastrado." });
        }

        // Hash da senha com bcrypt
        const saltRounds = 10;
        const hashedSenha = await bcrypt.hash(senha, saltRounds);

        // Inserir novo usuário no banco de dados
        const query = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
        await conexao.promise().query(query, [nome, email, hashedSenha]);

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});









// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
