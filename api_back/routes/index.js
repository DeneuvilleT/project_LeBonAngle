import express from 'express';
import { home, loadOneItem, postItem, pickPicture, updateItem } from '../controllers/product.controller.js';
import { users } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/api/v1/load_products", home);
router.get("/api/v1/load_users", users);
router.get("/api/v1/product/:id", loadOneItem);


router.post("/form/add", pickPicture);
router.post("/form/api/v1/picture", pickPicture);
router.post("/form/api/v1/product/add", postItem);
router.put("/api/v1/product/update/:id", updateItem);

export default router;