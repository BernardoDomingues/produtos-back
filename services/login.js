const bcrypt = require("bcryptjs"); // Criptografia da senha
const { db } = require("../config/firebaseDb");
const jwt = require('jsonwebtoken'); // Cria token de autenticação
const secret = require('../config/secret'); // Importa API Secret

module.exports.loginService = async (data) => {
  let returnValue = {
    status: false,
    error: "Dados Incorretos.",
  };
  await db
    .collection("users")
    .where("email", "==", data.email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const comparePassword = bcrypt.compareSync(
          data.password,
          userData.password
        );
        if (comparePassword) {
          const payload = {...userData, id: doc.id };
          const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: 43200 });
          returnValue = {
            status: true,
            userToken: token,
            description: "Os dados foram recebidos com sucesso.",
          };
        }
      });
    });
  return returnValue;
};
