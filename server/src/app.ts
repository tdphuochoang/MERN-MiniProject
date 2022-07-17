import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config"
import userRoute from "./routes/userRoute"

const app:Application = express();
app.use(express.json());

//Middlewares
app.use("/api/users", userRoute)

export {app}
