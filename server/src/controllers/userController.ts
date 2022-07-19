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

//GET A USER
export const getUser =  async (req: Request, res: Response) => {
    
    try{
        const user = await User.findById(req.params.id);
        return res.status(200).json(user)
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

//UPDATE USER

export const editUser  =  async (req: Request, res: Response) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        return res.status(201).json(updatedUser);
      } catch (err) {
        return res.status(500).json({message: "Fail to update user!"})
      }
}

//DELETE USER
export const deleteUser  =  async (req: Request, res: Response) => {
    
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been delete")
    }catch(err){
        return res.status(500).json({message: "Fail to delete user!"})
    }
}