import express from 'express';
import { home, loadOneItem, postItem, pickPicture, updateItem, deleteItem } from '../controllers/product.controller.js';
import { users } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/api/v1/load_products", home);
router.get("/api/v1/load_users", users);
router.get("/api/v1/product/:id", loadOneItem);
router.get("/api/v1/admin/", home);
router.get("/api/v1/admin/delete/:id", deleteItem);


router.post("/form/add", pickPicture);
router.post("/form/api/v1/picture", pickPicture);
router.post("/form/api/v1/product/add", postItem);
router.put("/api/v1/edit/update/:id", updateItem);

export default router;