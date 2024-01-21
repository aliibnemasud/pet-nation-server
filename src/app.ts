import express, { NextFunction, Request, Response } from "express";
import router from "./app/routes";
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Pet Nation web server is running......!");
});

app.use("/api/v1/", router);

export default app;
