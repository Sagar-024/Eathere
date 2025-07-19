import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import 'express-async-errors';

import errorHandlerMiddleware from "./Middleware/error-handler.js";
import notfound from "./Middleware/not-found.js";
import connect from './config/db.js';

import foodSpotRoutes from "./routes/foodRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/v1/foodspots', foodSpotRoutes);

app.use(notfound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connect(process.env.CONNECTION_STRING);
    app.listen(port, () => {
      console.log(`🚀 Server for your crazy idea is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
  }
};

start();