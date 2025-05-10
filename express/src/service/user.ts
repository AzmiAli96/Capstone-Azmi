import { loginUser, registerUser } from "../repository/user"
import bcrypt from 'bcrypt';
import { userData } from "../types/user";
import { response } from "express";


export const createUser = async (item: userData) => {

    const user = await registerUser(item);
    return user;
}

export const useUser = async (item: userData) => {
    const user = await loginUser(item);

    if (!user) {
        throw new Error("User not found");
    }
    
    const isPasswordValid = await bcrypt.compare(item.password, user.password);
    
    if (!isPasswordValid) {
        throw new Error("Wrong password");
    }    

    return user;
}