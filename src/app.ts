import express, { Application, json } from "express";
import handleMiddleware from "./middlewares/handle.middleware";
import userRoutes from "./routes/users.routes";

const app: Application = express();
app.use(json());

app.use("/users", userRoutes);

app.use(handleMiddleware.handleError);

export default app;
