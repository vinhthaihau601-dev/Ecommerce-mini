import { Router } from "express";
import { login } from "../controllers/auth.controller";
import rateLimiter from "../middleware/rateLimiter";

const router = Router()

const loginRateLimiter = rateLimiter(5, 60_000)

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Đăng nhập / xác thực
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập, trả về JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai email hoặc mật khẩu
 */
router.post('/login', loginRateLimiter, login)

export default router
