import mongoose from 'mongoose';
import {app} from "./app";

const port:string|undefined = process.env.PORT;

const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL!);
        console.log("Connected to DB");
        app.listen(port, () => {
            console.log("Server running on port ", port)
        })
    }catch(err){
        console.log("Failed to connect to DB")
        console.log(err)
    }
}

startServer();