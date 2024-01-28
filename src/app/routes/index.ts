import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { ProductRoutes } from '../modules/product/product.route';
import { OrderRoutes } from '../modules/order/order.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/customers',
    route: UserRoutes,
  }, 
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route?.route));

export default router;
