const { create, get } = require("../services/sells");

const createSell = async (req, res) => {
  const { body } = req;
  const token = req.headers.authorization;

  const response = await create(body, token); // Envia informações da venda e token para o service 
  res.send({
    status: true,
    products: response,
  });
};

const getUserSells = async (req, res) => {
  const { id } = req.params;

  const response = await get(id); // Envia id do usuário para o service 
  res.send({
    status: true,
    sells: response,
  });
};

module.exports = { createSell, getUserSells };
