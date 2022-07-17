import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config"

const app:Application = express();
app.use(express.json());

//Middlewares
app.get("/", (req: Request, res: Response) => {
    res.send({message: "It works"})
})

export {app}
