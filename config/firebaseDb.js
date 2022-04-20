const firebase = require("firebase");
const config = require("./database");
const app = firebase.initializeApp(config);
const db = firebase.firestore(app);

module.exports = { db };