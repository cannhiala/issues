'use strict';
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "10.9.17.36",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456@a",
  database: process.env.DB_NAME || "issuestracking"
});

module.exports = pool
