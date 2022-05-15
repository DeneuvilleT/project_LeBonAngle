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
      const sql = "SELECT * FROM user WHERE user.email = ?";
      const [query] = await pool.execute(sql, [mail]);
      return [query];
   };
};

export default User;