import {Request, Response} from "express";
import User from "../models/User";

//GET ALL USERS
export const getAllUsers  =  async (req: Request, res: Response) => {
    const users = await User.find();
    try{
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).json({err: err})
    }
}

//CREATE USER

export const createUser  =  async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    try{
        return res.status(201).json(user)
    }catch(err){
        return res.status(500).json({message: "Fail to create new user!"})
    }
}