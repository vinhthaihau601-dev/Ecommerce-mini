import { Response, Request } from "express";
import { Product } from "../models";
import { productSchema, updateProductSchema } from "../schema/productSchema";

// GET /api/products?categoryId=...
export async function getProducts(req: Request, res: Response) {
    const { categoryId } = req.query
    const filter = typeof categoryId === "string" ? { categoryId } : {}
    const products = await Product.find(filter)
    // NOTE: danh sách rỗng vẫn hợp lệ -> 200 + [], không phải "not found"
    res.status(200).json(products)
}

// GET /api/products/:id
export async function getProduct(req: Request, res: Response) {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({ error: "Product not found" })
    }

    res.status(200).json(product)
}

export async function createProduct(req: Request, res: Response) {
    const productParsed = productSchema.safeParse(req.body)
    if (!productParsed.success) {
        return res.status(400).json({ error: "Invalid data" })
    }
    const product = await Product.create(productParsed.data)
    res.status(201).json(product)
}

// PATCH /api/products/:id
export async function updateProduct(req: Request, res: Response) {
    const productParsed = updateProductSchema.safeParse(req.body)
    if (!productParsed.success) {
        return res.status(400).json({ error: "Invalid data" })
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productParsed.data, { new: true })
    if (!product) {
        return res.status(404).json({ error: "Product not found" })
    }
    res.status(200).json(product)
}

// DELETE /api/products/:id
export async function deleteProduct(req: Request, res: Response) {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
        return res.status(404).json({ error: "Product not found" })
    }

    res.status(204).send()
}
