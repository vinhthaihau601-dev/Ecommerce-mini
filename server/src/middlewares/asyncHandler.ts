import { NextFunction, Request, Response } from "express";

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

// Bắt lỗi throw/reject trong controller async rồi forward cho errorHandler,
// vì Express không tự bắt lỗi trong async function.
export function asyncHandler(handler: AsyncRouteHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
        handler(req, res, next).catch(next);
    };
}
