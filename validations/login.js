const { check } = require("express-validator");

// Validação dos dados
module.exports = [
  check('email', 'Email inválido').isEmail(),
  check('email', 'Email deve ter ao menos 5 caracteres').isLength({ min: 5 }),
  check('password', 'Senha deve ter ao menos 5 caracteres').isLength({ min: 5}),
];