import z from "zod";
import { NonEmptyTrimmedString } from "./userSchema";
import { OrderStatus } from "../models/Order";

export const orderItemSchema = z.object({
    variantId: NonEmptyTrimmedString,
    productName: NonEmptyTrimmedString,
    size: NonEmptyTrimmedString.optional(),
    color: NonEmptyTrimmedString.optional(),
    price: z.number().min(0),
    quantity: z.number().min(1),
})

export const orderSchema = z.object({
    userId: NonEmptyTrimmedString,
    items: z.array(orderItemSchema).min(1, "Order must have at least 1 item"),
    totalAmount: z.number().min(0),
    status: z.enum(Object.values(OrderStatus) as [OrderStatus, ...OrderStatus[]]).optional(),
    shippingAddress: NonEmptyTrimmedString.optional(),
})
