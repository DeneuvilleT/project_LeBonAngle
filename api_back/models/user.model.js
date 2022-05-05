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
};

export default User;