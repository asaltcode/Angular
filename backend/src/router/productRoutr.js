import express from 'express';
import productController from '../controller/productController.js';
import { upload, createThumbnail } from '../config/fileUpload.js';

const router = express.Router();

router.post("/", productController.addProduct);
router.get('/', productController.getProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.single('image'), createThumbnail, productController.editProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
