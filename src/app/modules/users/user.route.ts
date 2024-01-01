import express, { Request, Response } from 'express';
import { usersController } from './user.controller';
const router = express.Router();

router.post('/create-customer', async (req: Request, res: Response) => {
    const { ...userData } = req.body;

    console.log(req.body)

    res.send({some: req.body})
    }
);


export const UserRoutes = router;