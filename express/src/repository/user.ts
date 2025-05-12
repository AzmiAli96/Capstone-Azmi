// berkomunikasi dengan database

import prisma from "../db/prisma";
import bcrypt from 'bcrypt';
import { userData } from "../types/user";

export const registerUser = async (item: userData ) => {
    const hashedPassword  = await bcrypt.hash(item.password, 10);

    const user = await prisma.user.create({
        data: {
            name: item.name,
            email: item.email,
            password: hashedPassword,
            alamat: item.alamat,
            role: item.role,
            no_hp: item.no_hp,
            image: item.image
        },
    });
    return user;
}

export const loginUser = async (item: userData) => {
    const user = await prisma.user.findUnique({
        where: {
            email: item.email,
        },
    });
    return user;
}

export const findUser = async () => {
    const user = await prisma.user.findMany();
    return user;
}

export const findUserById = async (itemId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: itemId,
        },
    });

    return user;
}


export const deleteUser = async (itemId: number) => {
    await prisma.user.delete({
        where: {
            id: itemId,
        },
    });
}