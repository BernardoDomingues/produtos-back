const express = require("express");
const cors = require("./config/cors");

// Importa validações
const registerValidation = require("./validations/registration");
const loginValidation = require("./validations/login");
const { isAuth } = require("./middleware");

// Importa Controllers
const { version } = require("./controllers/version");
const { register } = require("./controllers/register");
const { login } = require("./controllers/login");
const { listProducts, getProduct, searchProduct } = require("./controllers/products");
const { createSell } = require("./controllers/sells");

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
app.get("/getProduct/:id", getProduct);
app.get("/searchProduct/:parameter", searchProduct);

app.post("/createSell", isAuth, createSell);

// Declaração do App
app.listen(PORT, () => {
  console.info(`Servidor rodando na porta ${PORT}`);
});
