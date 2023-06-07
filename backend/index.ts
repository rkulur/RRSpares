import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./src/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { categoryRoutes, userRoutes } from "./src/Routes";

const app = express();

dotenv.config();
connectDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_SERVER,
    credentials: true,
  })
);

// Routes
app.use("/account", userRoutes);
app.use("/categories", categoryRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});
