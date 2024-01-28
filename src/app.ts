import express, { Request, Response } from "express";
import router from "./app/routes";
import cors from 'cors';
import path from "path";
const app = express();

import dotenv from 'dotenv';
require('dotenv').config()
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SK_KEY as string);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Pet Nation web server is running......!");
});

app.use("/api/v1/", router);

try {
  app.post("/create-payment-intent", async (req, res) => {    
    
  const amount = +(req.body.totalPrice) * 100; 
    if (amount) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    }
    
  });
} catch (error) {
  console.log(error);
}



//  This is using to make upload images folder public accessible
app.use("/upload_images", express.static(path.join(__dirname, "..", "upload_images")));

export default app;
