import Product from "../models/product.model.js";



export const home = async (req, res, next) => {
   try {
      const items = await Product.getAllProducts();
      if (!items[0].length) {
         throw Error;
      } else {
         res.status(200).send(items)
      };
   } catch (error) {
      console.log(error);
   };
};

export const category = async (req, res, next) => {
   try {
      const items = await Product.getAllCategory();
      if (!items[0].length) {
         throw Error;
      } else {
         res.status(200).send(items)
      };
   } catch (error) {
      console.log(error);
   };
};

export const pickPicture = async (req, res, next) => {

   if (!req.files || !Object.keys(req.files).length) {
      res.status(400);
   };

   req.files.image.mv(`public/images/${req.files.image.name}`, (error) => {

      if (error) {
         res.json({
            status: 500,
            msg: "Echec de l'enregistrement",
         });
      };
   });

   res.json({
      status: 200,
      msg: `L'image ${req.files.image.name} a été chargée.`,
      url: req.files.image.name,
   });
};

export const postItem = async (req, res, next) => {

   const datas = {
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      img: req.body.img,
      price: req.body.price,
      user: 1,
      category: req.body.category,
   };

   const query = "INSERT INTO `product`(`id`, `title`, `description`, `quantity`, `post_date`, `img`, `price`, `id_user`, `id_category`) VALUES (NULL,?,?,?,NOW(),?,?,?,?)";

   try {
      await Product.addSaveItem(query, datas);
      res.json({
         status: 200,
         msg: "Sucess !"
      })
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
         res.status(200).send(item);
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
      price: req.body.price,
      category: req.body.category
      // img: req.body.img,
   };

   const query = `UPDATE product SET title = ?, description = ?, quantity = ?, post_date = 
   NOW(), price = ?, id_category = ? WHERE product.id = ${id}`;

   try {
      await Product.addSaveItem(query, datas);
      res.json({
         status: 200,
         msg: `Les informations ont bien été mis à jour.`,
      });
   } catch (error) {
      console.log(error);
   };
};

export const deleteItem = async (req, res, next) => {
   const id = req.params.id;
   try {
      await Product.deleteThisItem(id);
      res.json({
         status: 200,
         msg: `L'article a bien été supprimé.`,
      });
   } catch (error) {
      console.log(error);
   };
};