import express, { NextFunction, Request, Response } from "express";
import router from "./app/routes";
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Pet Nation web server is running......!')
})


app.use('/api/v1/', router);

export default app;