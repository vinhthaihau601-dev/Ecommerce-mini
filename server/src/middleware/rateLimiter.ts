import { NextFunction, Request, Response } from "express";

interface Attempt {
    count: number;
    resetAt: number;
}

const attempts = new Map<string, Attempt>();

export default function rateLimiter(maxRequests: number, windowMs: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const key = req.ip ?? "unknown";
        const now = Date.now();
        const record = attempts.get(key);

        if (!record || now > record.resetAt) {
            attempts.set(key, { count: 1, resetAt: now + windowMs });
            next();
            return;
        }

        if (record.count >= maxRequests) {
            const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
            res.status(429).json({ error: "Too many requests, please try again later", retryAfterSeconds });
            return;
        }

        record.count += 1;
        next();
    };
}
