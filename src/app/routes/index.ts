import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
const router = express.Router();

/* router.use('/users', UserRoutes)
router.use('/semester', AcademicSemesterRoutes) */

const moduleRoutes = [
  {
    path: '/customers',
    route: UserRoutes,
  }  
];

moduleRoutes.forEach(route => router.use(route.path, route?.route));

export default router;
