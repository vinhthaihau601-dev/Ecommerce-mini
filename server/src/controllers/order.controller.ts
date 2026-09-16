import { Response, Request } from "express";
import { Order } from "../models";
import { orderSchema } from "../schema/orderSchema";

// GET /api/orders/:userId
export async function getOrders(req: Request, res: Response) {
    const orders = await Order.find({ userId: req.params.userId })
    res.status(200).json({ orders })
}

// GET /api/orders/:userId/:id
export async function getOrder(req: Request, res: Response) {
    const order = await Order.findOne({ _id: req.params.id, userId: req.params.userId })
    if (!order) {
        return res.status(404).json({ error: "Order not found" })
    }

    res.status(200).json({ order })
}

export async function createOrder(req: Request, res: Response) {
    const orderParsed = orderSchema.safeParse(req.body)
    if (!orderParsed.success) {
        return res.status(400).json({ error: "Invalid data" })
    }

    const order = await Order.create(orderParsed.data)
    res.status(201).json({ order })
}

// DELETE /api/orders/:id
export async function deleteOrder(req: Request, res: Response) {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
        return res.status(404).json({ error: "Order not found" })
    }

    res.status(204).send()
}
