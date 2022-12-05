import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { AppRouter } from "./src/routes/index.route";
import mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
import { mqCategoryConsumer } from "./src/services/rabbitmq/consumer/category.store";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", AppRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  mqCategoryConsumer();
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

// DB Connection here
mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    if (error) console.log("Failed to connect DB");
  });
