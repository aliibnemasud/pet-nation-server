import express, { Request, Response } from "express";
import router from "./app/routes";
import cors from 'cors';
import path from "path";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Pet Nation web server is running......!");
});

app.use("/api/v1/", router);

//  This is using to make upload images folder public accessible
app.use("/upload_images", express.static(path.join(__dirname, "..", "upload_images")));

export default app;
