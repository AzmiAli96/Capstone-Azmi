import { response } from "express";
import { deleteOrder, editOrder, findOrder, findOrderById, insertOrder } from "../repository/order";
import { orderData } from "../types/order";


export const getAllOrder = async () => {
    const order = await findOrder();
    return order;
};

export const getOrderById = async (itemId: number) => {
    const order = await findOrderById(itemId);
    if (!order) {
        return response.status(400).send("order Not found");
    }
    return order;
}

export const createOrder = async (item: orderData) => {
    const order = await insertOrder(item)
    return order;
}

export const updateOrderById = async (itemId: number, item: orderData ) => {
    const order = await editOrder(itemId, item);
    return order;
}

export const deleteOrderById = async (itemId: number ) => {
    const order = await deleteOrder(itemId);
    return order;
}