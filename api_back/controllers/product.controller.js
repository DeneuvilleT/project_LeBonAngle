import Product from "../models/product.model.js";


export const home = async (req, res, next) => {
   try {
      const item = await Product.getAllProducts();
      if (!item[0].length) {
         throw Error;
      } else {
         console.log(item);
      };
   } catch (error) {
      console.log(error);
   };
};


export const postItem = async (req, res, next) => {

   const datas = {
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      img: req.body.img,
      price: req.body.price,
      user: req.body.user,
      category: req.body.category
   };

   const query = "INSERT INTO `product`(`id`, `title`, `description`, `quantity`, `post_date`, `img`, `price`, `id_user`, `id_category`) VALUES (NULL,?,?,?,NOW(),?,?,?,?)";

   try {
      await Product.addSaveItem(query, datas);
      console.log(req.body);
   } catch (error) {
      console.log(error);
   };
};


export const loadOneItem = async (req, res, next) => {
   const id = req.params.id;
   try {
      const item = await Product.getOneProduct(id);
      if (!item[0].length) {
         throw Error;
      } else {
         console.log(item);
      };
   } catch (error) {
      console.log(error);
   };
};


export const updateItem = async (req, res, next) => {
   const id = req.params.id;

   const datas = {
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      img: req.body.img,
      price: req.body.price,
      user: req.body.user,
      category: req.body.category
   };

   const query = `UPDATE product SET title = ?, description = ?, quantity = ?, post_date = NOW(), img = ?, price = ?, id_user = ?, id_category = ? WHERE product.id = ${id}` ;

   try {
      await Product.addSaveItem(query, datas);

   } catch (error) {
      console.log(error);
   };
};