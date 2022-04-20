const { validationResult  } = require("express-validator");
const { loginService } = require("../services/login");

const login = async (req, res) => {
  const errors = validationResult(req); // Confere se os dados enviados estão corretos
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const response = await loginService(req.body); // Envia informações do body para o service
  return res.status(200).json(response);
};

module.exports = { login };
