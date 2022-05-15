import pool from "../config/db.js";

class User {
   constructor() {

   }

   static async getAllUsers() {
      const sql = `
      SELECT * FROM user`;

      const [query] = await pool.execute(sql);
      return [query];
   };

   static async addSaveItem(sql, datas) {
      const [query] = await pool.execute(sql, [...Object.values(datas)]);
      return query;
   };

   static async login(firstname) {
      const sql = "SELECT * FROM user WHERE user.firstname = ?";
      const [query] = await pool.execute(sql, [firstname]);
      return [query];
   };

   static async logMail(mail) {
      const sql1 = "SELECT * FROM user WHERE user.email = ?";
      const [query1] = await pool.execute(sql1, [mail]);

      const sql2 = `UPDATE user SET activate = 1 WHERE user.email = '${ mail }'`;
      const [query2] = await pool.execute(sql2, [mail]);

      return [query1];
   };
   
};

export default User;