const { validationResult  } = require("express-validator");
const { registerService } = require("../services/register");

const register = async (req, res) => {
  const errors = validationResult(req); // Confere se os dados enviados estão corretos
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const response = await registerService(req.body); // Envia informações do body para o service
  return res.status(200).json(response);
};

module.exports = { register };
