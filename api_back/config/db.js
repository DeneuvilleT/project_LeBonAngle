import mysql from 'mysql2/promise';
import 'dotenv/config';


const { HOST_DB, NAME_DB, USERNAME_DB, PASSWORD_DB } = process.env;

const pool = mysql.createPool({
   connectionLimit: 10000,
   host: HOST_DB,
   database: NAME_DB,
   user: USERNAME_DB,
   password: PASSWORD_DB,
});

pool.getConnection().then((res)=> {
   console.log(
      `Great ${res.config.database}` 
   );
});

export default pool;