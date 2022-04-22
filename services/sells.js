const { db } = require("../config/firebaseDb.js");
const { format } = require("date-fns");

const { getUserByToken } = require("../middleware/getUserByToken");

module.exports.create = async (data, token) => {
  const userData = getUserByToken(token);

  const sellData = {
    userId: userData.id,
    date: format(new Date(), 'dd/MM/yyyy'),
    ...data
  }
  return db.collection("sells").doc().set(sellData);
};

module.exports.get = async (userId) => {
  let res = [];

  await db.collection("sells").where("userId", "==", userId)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        res.push({...doc.data(), id: doc.id});
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
  return res;
};
