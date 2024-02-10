import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();
router.post('/create-order', orderController.createOrder);
router.get('/get-order/:id', orderController.getSingleOrder);
router.patch('/update-order/:id', orderController.updateOrder);
router.delete('/delete-order/:id', orderController.deleteOrder);
router.get('/ger-orders', orderController.getAllOrders);
export const OrderRoutes = router;