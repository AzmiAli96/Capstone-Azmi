import { deleteUser, findUser, findUserById, loginUser, registerUser } from "../repository/user"
import bcrypt from 'bcrypt';
import { userData } from "../types/user";
import { response } from "express";
import jwt from "jsonwebtoken";


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

    const payload = {
        id: user.id,
        name: user.name,
        alamat: user.alamat,
        no_hp: user.no_hp,
        role: user.role
    }

    const secret = process.env.JWT_SECRET!;
    const expiresIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, {expiresIn: expiresIn} )
    
    return{
        user: payload,
        token: token
    };
};

export const getAllUser = async () => {
    const user = await findUser();
    return user;
};

export const getUserById = async (itemId: number) => {
    const user = await findUserById(itemId);
    if (!user) {
        return response.status(400).send("user Not found");
    }
    return user;
}

export const deleteUserById = async (itemId: number ) => {
    const user = await deleteUser(itemId);
    return user;
}