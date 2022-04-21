
const jwt = require('jsonwebtoken');
const secret = require('../config/secret'); // Importa API Secret

module.exports.getUserByToken = (token) => jwt.verify(token, secret);