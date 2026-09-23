import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export default function validationSchema(schema: ZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body)
        if (!parsed.success) {
            return res.status(400).json({ error: "Invalid data" })
        }
        next()
    }
}