import { Response, Request, NextFunction } from "express";
import { IUser } from "../../models/User";

export default function authorize(...allowedRoles: IUser["role"][]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.auth) {
            res.status(401).json({ error: "Not authenticated" })
            return
        }

        if (!allowedRoles.includes(req.auth.role)) {
            res.status(403).json({ error: "Forbidden: insufficient permissions" })
            return
        }

        next()
    }
}
