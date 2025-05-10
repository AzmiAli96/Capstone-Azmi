import prisma from "../db/prisma";
import { orderData } from "../types/order";

export const findOrder = async () => {
    const order = await prisma.pengiriman.findMany({
        include: { user: true, wilayah: true }
    });
    return order;
}

export const findOrderById = async (itemId: number) => {
    const order = await prisma.pengiriman.findUnique({
        where: {
            id: itemId,
        },
    });
    return order;
}

export const insertOrder = async (item: orderData) => {
    const wilayah = await prisma.wilayah.findUnique({
        where: { id: item.id_wilayah }
    });

    if (!wilayah) {
        throw new Error("Wilayah tidak ditemukan");
    }

    const total = Number(item.berat) * Number(wilayah.harga);

    // Buat pengiriman
    const order = await prisma.pengiriman.create({
        data: {
            berat: item.berat,
            koli: item.koli,
            pembayaran: item.pembayaran,
            total: total,
            ket: item.ket,
            image: item.image || null,
            tanggal: item.tanggal ? new Date(item.tanggal) : undefined,
            id_user: item.id_user,
            id_wilayah: item.id_wilayah
        },
    });

    // Setelah pengiriman dibuat, buat status default
    await prisma.status.create({
        data: {
            spengiriman: "pengambilan barang",
            spembayaran: "belum dibayar",
            id_pengiriman: order.id,
        },
    });

    return {
        ...order,
        wilayah: wilayah.wilayah
    };
};

export const editOrder = async (itemId: number, item: orderData) => {
    const wilayah = await prisma.wilayah.findUnique({
        where: { id: item.id_wilayah }
    });

    if (!wilayah) {
        throw new Error("Wilayah tidak ditemukan");
    }

    const total = Number(item.berat) * Number(wilayah.harga);

    const order = await prisma.pengiriman.update({
        where: { id: itemId },
        data: {
            berat: item.berat,
            koli: item.koli,
            pembayaran: item.pembayaran,
            total: total,
            ket: item.ket,
            image: item.image || null,
            tanggal: item.tanggal ? new Date(item.tanggal) : undefined,
            id_user: item.id_user,
            id_wilayah: item.id_wilayah
        },
    });

    return {
        ...order,
        wilayah: wilayah.wilayah
    };
};


export const deleteOrder = async (itemId: number) => {
    await prisma.pengiriman.delete({
        where: {
            id: itemId,
        },
    });
}