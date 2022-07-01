import express, { Express } from "express";
import * as MySQLConnector from "./utils/mysql.connector";
const app: Express = express();
app.use(express.json());

MySQLConnector.init();

import taskRouter from "./routes/tasksRoutes";
app.use("/api/v1/tasks", taskRouter);

export default app;
