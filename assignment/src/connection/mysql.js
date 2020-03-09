import mysql from 'mysql2/promise';
import { config } from '../../config';

const pool = mysql.createPool({
  connectionLimit: 100,
  waitForConnections: true,
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  charset: 'utf8mb4',
  password: config.database.password,
  database: config.database.name,
  debug: true
});

pool.queryRow = (...args) => pool.query(...args).then(r => r[0]);

pool.transaction = async transaction => {
  const connection = await pool.getConnection()
    .catch(err => { throw new Error(err); });

  try {
    await connection.beginTransaction();
    await transaction(connection);
    await connection.commit();
  } catch (e) {
    await connection.rollback();

    throw e;
  } finally {
    connection.release();
  }
};

export const mysqlPool = pool;
