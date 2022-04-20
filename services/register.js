const bcrypt = require("bcryptjs"); // Criptografia da senha
const { db } = require("../config/firebaseDb.js");

module.exports.registerService = async (data) => {
  const saltRounds = 10; // Define quantas vezes a senha será incriptada
  const salt = bcrypt.genSaltSync(saltRounds);
  data.password = bcrypt.hashSync(data.password, salt);

  const saveDatabase = await db.collection("users").doc().set(data);
  return {
    status: true,
    saveDatabase,
  };
};
