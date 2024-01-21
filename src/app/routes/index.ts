import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { ProductRoutes } from '../modules/product/product.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/customers',
    route: UserRoutes,
  }, 
  {
    path: '/product',
    route: ProductRoutes,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route?.route));

export default router;
