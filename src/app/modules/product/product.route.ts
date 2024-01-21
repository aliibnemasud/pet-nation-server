import express from 'express';
import { productController } from './product.controller';
import uploader from '../../../util/uploader';

const router = express.Router();

router.post('/create-product', productController.createProduct);

router.post('/upload', uploader.single("image"), productController.uploadImages);


export const ProductRoutes = router;