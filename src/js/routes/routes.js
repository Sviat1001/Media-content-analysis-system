'use strict'

const mysql = require('mysql2/promise');
const config = require('../yaml-config.js')('./service.config.yml');

const executeSql = async (query, values) => {
  let connection;
  let sqlStatement;
  try {
    connection = await mysql.createConnection({
      host: config.db.host,
      user: config.db.userName,
      password: config.db.userPassword,
      database: config.db.dbName,
      namedPlaceholders: true,
    });

    sqlStatement = connection.format(query, values);
    const [results] = await connection.execute(sqlStatement);
    return results;
  }
  catch (e) {
    throw new Error(`${e.toString()}`);
  } finally {
    if(connection) connection.end();
  }
}
module.exports = { executeSql };