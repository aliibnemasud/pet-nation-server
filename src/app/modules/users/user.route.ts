import express from 'express';
import { usersController } from './user.controller';
const router = express.Router();

router.post('/create-customer', usersController.createCustomer);


export const UserRoutes = router;