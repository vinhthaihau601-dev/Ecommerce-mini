import { NextFunction, Request, Response } from "express";

export default function requireSelfOrAdmin(req: Request, res: Response, next: NextFunction) {
    const match = req.auth?.userId === req.params.id
    const isAdmin = req.auth?.role === "admin"
    const allow = match || isAdmin
    if (!allow) {
        return res.status(403).json({ error: "Unauthenticated or you don't have permission" })
    }
    next()
}