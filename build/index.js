"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_route_1 = require("./src/routes/index.route");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//import { mqCategoryConsumer } from "./src/services/rabbitmq/consumer/category.store";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", index_route_1.AppRouter);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    //mqCategoryConsumer();
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
// DB Connection here
mongoose
    .connect(`${process.env.DB_URL}`)
    .then(() => console.log("Database connected"))
    .catch((error) => {
    if (error)
        console.log("Failed to connect DB");
});
