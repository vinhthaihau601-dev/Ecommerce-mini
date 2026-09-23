import { Response, Request, NextFunction } from "express";
import { User } from "../../models";
import { verifyToken } from "../../utils/jwt";

export default async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid Authorization header" })
        return
    }

    const token = authHeader.slice("Bearer ".length)

    try {
        const payload = verifyToken(token)

        const user = await User.findById(payload.userId)
        if (!user) {
            res.status(401).json({ error: "User no longer exists" })
            return
        }

        req.auth = payload
        next()
    } catch {
        res.status(401).json({ error: "Invalid or expired token" })
    }
}
