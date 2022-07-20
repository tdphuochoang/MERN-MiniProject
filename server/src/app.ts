import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config"
import userRoute from "./routes/userRoute"
import { generateUploadURL } from './s3'

const app:Application = express();


//Middlewares
app.use(express.json());
app.use(cors())
app.use("/api/users", userRoute)
app.get('/s3Url', async (req: Request, res: Response) => {
    const url = await generateUploadURL()
    res.send({url})
})

export {app}
