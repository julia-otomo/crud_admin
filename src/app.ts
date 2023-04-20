import "express-async-errors";
import express, { Application, json } from "express";
import userRoutes from "./routes/users.routes";
import handleError from "./middlewares/handle.middleware";
import sessionRoutes from "./routes/session.routes";

const app: Application = express();
app.use(json());

app.use("/users", userRoutes);

app.use("/login", sessionRoutes);

app.use(handleError);

export default app;
