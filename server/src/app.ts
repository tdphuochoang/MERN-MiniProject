import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config"
import userRoute from "./routes/userRoute"

const app:Application = express();


//Middlewares
app.use(express.json());
app.use(cors())
app.use("/api/users", userRoute)

export {app}
