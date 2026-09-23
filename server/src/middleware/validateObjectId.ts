import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export default function validateObjectId(req: Request, res: Response, next: NextFunction) {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id as string)
    if (!isValid) return res.status(400).json({ error: "Invalid id" })
    next()
}