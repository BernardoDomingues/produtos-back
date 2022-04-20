const express = require("express");

// Importa validações
const registerValidation = require("./validations/registration");

// Importa Controllers
const { version } = require("./controllers/version");
const { register } = require("./controllers/register");

// Configurações do app
const PORT = 5000; // Porta
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get("/", version);
app.post("/register", registerValidation, register);

// Declaração do App
app.listen(PORT, () => {
  console.info(`Servidor rodando na porta ${PORT}`);
});
