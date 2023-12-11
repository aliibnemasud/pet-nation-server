import express, { NextFunction, Request, Response } from "express";
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Pet Nation web server is running......!')
})

export default app;