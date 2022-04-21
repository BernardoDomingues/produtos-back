const { db } = require("../config/firebaseDb.js");

const { getUserByToken } = require("../middleware/getUserByToken");

module.exports.create = async (data, token) => {
  const userData = getUserByToken(token);

  const sellData = {
    userId: userData.id,
    ...data
  }
  return db.collection("sells").doc().set(sellData)
};
