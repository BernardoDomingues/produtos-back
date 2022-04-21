const express = require("express");
const cors = require("./config/cors");

// Importa validações
const registerValidation = require("./validations/registration");
const loginValidation = require("./validations/login");

// Importa Controllers
const { version } = require("./controllers/version");
const { register } = require("./controllers/register");
const { login } = require("./controllers/login");
const { listProducts, findProduct } = require("./controllers/products");

// Configurações do app
const PORT = 5000; // Porta
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

// Rotas
app.get("/", version);
app.post("/register", registerValidation, register);
app.post("/login", loginValidation, login);

app.get("/listProducts/:pagination", listProducts);
app.get("/findProduct/:id", findProduct);

// Declaração do App
app.listen(PORT, () => {
  console.info(`Servidor rodando na porta ${PORT}`);
});
