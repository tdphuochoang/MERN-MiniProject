import { Schema, model } from "mongoose";

export interface User {
    profilePic: String;
    name: String;
    email: String;
    phone: String;
}

const UserSchema = new Schema<User>({
    profilePic: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
})

export default model<User>('User', UserSchema)

