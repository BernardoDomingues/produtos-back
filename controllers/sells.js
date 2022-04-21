const { create } = require("../services/sells");

const createSell = async (req, res) => {
  const { body } = req;
  const token = req.headers.authorization;

  const response = await create(body, token); // Envia informações da paginação para o service 
  res.send({
    status: true,
    products: response,
  });
};

module.exports = { createSell };
