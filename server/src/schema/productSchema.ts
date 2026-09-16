import { z } from "zod";
import { NonEmptyTrimmedString } from "./userSchema";

export const productSchema = z.object({
    name: NonEmptyTrimmedString,
    // FIX: model Product.ts khai báo description?/images (default []) là optional — zod trước
    // đây bắt buộc cả 2, nên tạo product không gửi description/images sẽ bị 400 dù model
    // không yêu cầu vậy (giống lỗi role đã sửa ở userSchema)
    description: z.string().min(1).optional(),
    images: z.string().array().optional(),
    categoryId: NonEmptyTrimmedString
})

export const updateProductSchema = productSchema.partial()
