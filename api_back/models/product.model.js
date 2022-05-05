import pool from "../config/db.js";

class Product {
   constructor(id, title, description, quantity, post_date, img, price, id_user, id_category, name_category) {
      this.id = id,
         this.title = title,
         this.description = description,
         this.quantity = quantity,
         this.post_date = post_date,
         this.img = img,
         this.price = price,
         this.id_user = id_user,
         this.id_category = id_category,
         this.name_category = name_category
   }

   static async getAllProducts() {
      const sql = `
      SELECT * FROM product`;

      const [query] = await pool.execute(sql);
      return [query];
   };

   static async getOneProduct(dataId) {
      const sql1 = `
      SELECT title, description, quantity, post_date, img, price FROM product WHERE product.id = ?`;
      const sql2=
      `SELECT lastname, firstname, adress FROM product JOIN user 
      ON product.id_user = user.id WHERE product.id = ?`;
      const sql3=
      `SELECT name FROM product JOIN category 
      ON product.id_category = category.id WHERE product.id = ?`;

      const [query1] = await pool.execute(sql1, [dataId]);
      const [query2] = await pool.execute(sql2, [dataId]);
      const [query3] = await pool.execute(sql3, [dataId]);
      return [query1,query2, query3];
   };

   static async addSaveItem(sql, datas) {
      const [query] = await pool.execute(sql, [...Object.values(datas)]);
      return query;
   };
};

export default Product;