import { Request, Response } from "express";
import { Cart } from "../models";
import { updateCartSchema } from "../schema/cartSchema";

// GET /api/carts/:userId
export async function getCart(req: Request, res: Response) {
    const cart = await Cart.findOne({ userId: req.params.userId })
    if (!cart) {
        return res.status(404).json({ error: "Cannot find user cart." })
    }

    return res.status(200).json(cart)
}

// PATCH /api/carts/:userId
export async function updateCart(req: Request, res: Response) {
    const parsed = updateCartSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid data" })
    }
    const { items } = parsed.data

    const cart = await Cart.findOneAndUpdate(
        { userId: req.params.userId },
        { userId: req.params.userId, items },
        { new: true, upsert: true }
    )

    return res.status(200).json(cart)
}
