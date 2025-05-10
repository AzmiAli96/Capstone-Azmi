import prisma from "../db/prisma";
import { statusData } from "../types/status";

export const findStatus = async () => {
    const status = await prisma.status.findMany({
        include: {pengiriman:true}
    });
    return status;
}
