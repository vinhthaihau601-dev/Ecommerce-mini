import { z } from "zod";
import { NonEmptyTrimmedString } from "./userSchema";

export const variantSchema = z.object({
    productId: NonEmptyTrimmedString,
    color: NonEmptyTrimmedString.optional(),
    size: NonEmptyTrimmedString.optional(),
    price: z.number().min(0),
    stock: z.number().min(0).default(0),
})

// update = partial, giống pattern đã dùng cho user/product: PATCH không bắt buộc gửi đủ field
export const updateVariantSchema = variantSchema.partial()
