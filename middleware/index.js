
const { db } = require("../config/firebaseDb");

const { getUserByToken } = require("./getUserByToken");

module.exports.isAuth = async (req, res, next) => {
  if (!req.headers.authorization) { // Verifica existência do token
    return res.status(401).json({ error: 'Token não encontrado' });
  };

  const token = req.headers.authorization; // Verifica se o usuario do token enviado existe
  const user = getUserByToken(token);
  const authorizedUser = await db
    .collection("users")
    .doc(user.id)
    .get()
    .then((querySnapshot) => querySnapshot.data());
  if (!authorizedUser) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  return next();
};