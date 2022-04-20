const { check } = require("express-validator");
const { db } = require("../config/firebaseDb.js");

// Validação dos dados
module.exports = [
  check('email', 'Email inválido').isEmail(),
  check('email', 'Email deve ter ao menos 5 caracteres').isLength({ min: 5 }),
  check('email').custom(async (value) => {
    await db // Pesquisa email no banco conferindo se já foi cadastrado
      .collection("users")
      .where("email", "==", value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData) { 
            throw new Error('Email já cadastrado');
          }
        });
      });
    return true;
  }),
  check('name', 'Nome deve ter ao menos 5 caracteres').isLength({ min: 5 }),
  check('password', 'Senha deve ter ao menos 5 caracteres').isLength({ min: 5}),
  check('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Senhas não conferem');
    }
    return true;
  }),
];