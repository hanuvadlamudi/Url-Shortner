import userSchema from "../model/user.model.js"
import jsonwebtoken from "jsonwebtoken";

export const registerUserService = async(name,email,password){
    const user = await userSchema.findOne({email});

    if(user){
        throw new Error("User already Existed");
    }

    const newUser = new userSchema({ username,email,password});
    await newUser.save();

    
}