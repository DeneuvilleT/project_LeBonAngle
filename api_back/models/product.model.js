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
      SELECT product.id, title, description, post_date, quantity, price, img, firstname, lastname, name
      FROM product INNER JOIN user ON product.id_user = user.id
      INNER JOIN category ON product.id_category = category.id ORDER BY post_date DESC`;

      const [query] = await pool.execute(sql);
      return [query];
   };

   static async getOneProduct(dataId) {
      const sql = `
      SELECT product.id, title, description, post_date, quantity, price, img, firstname, lastname, name
      FROM product INNER JOIN user ON product.id_user = user.id
      INNER JOIN category ON product.id_category = category.id WHERE product.id = ?`;


      const [query] = await pool.execute(sql, [dataId]);
      return [query];
   };

   static async addSaveItem(sql, datas) {
      const [query] = await pool.execute(sql, [...Object.values(datas)]);
      return query;
   };
};

export default Product;