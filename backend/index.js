import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors'

const app = express();

// middle for parsing request body
app.use(express.json())

// middleware for cors policy
app.use(cors()) // default

// allow custom
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

app.get("/", (request, response) => {
  response.send("Welcome Book Store");
});

app.use('/books' , booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('app connect');
    app.listen(PORT, () => {
        console.log(`port ${PORT}`);
      });
  })
  .catch((error) => {
     console.log(error);
  });
