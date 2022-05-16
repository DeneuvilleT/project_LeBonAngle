import express from 'express';
import {
   home, loadOneItem, loadOneItemByUser, postItem, pickPicture, updateItem, deleteItem, category
} from '../controllers/product.controller.js';
import {
   loadUsers, loadOneUser, postUser, loginUser, sendMail, validateUser
} from '../controllers/user.controller.js';



const router = express.Router();

router.get("/api/v1/load_products", home);
router.get("/api/v1/load_users", loadUsers);
router.get("/api/v1/load_user/:id", loadOneUser);
router.get("/api/v1/load_category", category);

router.get("/api/v1/product/:id", loadOneItem);
router.get("/api/v1/product_user/:id", loadOneItemByUser);
router.get("/api/v1/admin/", home);
router.get("/api/v1/admin/delete/:id", deleteItem);

router.post("/form/api/v1/login", loginUser);
router.post("/form/api/v1/picture", pickPicture);
router.post("/form/api/v1/product/add", postItem);
router.post("/form/api/v1/product/add_user", postUser);

router.put("/api/v1/edit/update/:id", updateItem);

router.get("/api/v1/validate_user/:email", validateUser);
router.post("/form/api/v1/sendMail", sendMail);
export default router;