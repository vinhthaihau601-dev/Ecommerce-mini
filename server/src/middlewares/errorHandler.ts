import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({ error: `Cannot find ${req.method} ${req.originalUrl}` });
}

// Phải giữ đủ 4 tham số (err, req, res, next) — Express nhận diện error middleware qua arity.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    console.error(err);

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({ error: "Invalid id" });
    }
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ error: err.message });
    }

    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
}
