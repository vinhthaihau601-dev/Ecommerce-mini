import { Request, Response } from "express";
import { Variant } from "../models";
import { variantSchema, updateVariantSchema } from "../schema/variantSchema";

// GET /api/variants?productId=...
// NOTE: productId là query string (optional), giống categoryId ở product.controller.ts —
// "lấy tất cả variant" vẫn có nghĩa nếu bỏ productId, nên đây là filter, không phải route param
export async function getVariants(req: Request, res: Response) {
    const { productId } = req.query
    const filter = typeof productId === "string" ? { productId } : {}
    const variants = await Variant.find(filter)
    res.status(200).json(variants)
}

// GET /api/variants/:id
export async function getVariant(req: Request, res: Response) {
    const variant = await Variant.findById(req.params.id)
    if (!variant) {
        return res.status(404).json({ error: "Variant not found" })
    }
    res.status(200).json(variant)
}

// POST /api/variants
export async function createVariant(req: Request, res: Response) {
    const parsed = variantSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid data" })
    }
    const variant = await Variant.create(parsed.data)
    res.status(201).json(variant)
}

// PATCH /api/variants/:id
export async function updateVariant(req: Request, res: Response) {
    const parsed = updateVariantSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid data" })
    }

    const variant = await Variant.findByIdAndUpdate(req.params.id, parsed.data, { new: true })
    if (!variant) {
        return res.status(404).json({ error: "Variant not found" })
    }
    res.status(200).json(variant)
}

// DELETE /api/variants/:id
export async function deleteVariant(req: Request, res: Response) {
    const variant = await Variant.findByIdAndDelete(req.params.id)
    if (!variant) {
        return res.status(404).json({ error: "Variant not found" })
    }
    res.status(204).send()
}
