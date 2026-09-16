import { Router } from "express";
import { getCart, updateCart } from "../controllers/cart.controller";

const routes = Router()

// FIX: đổi sang /:userId cho cả 2 route — controller đọc userId từ route param,
// route "/" cũ không có param nào để đọc

/**
 * @openapi
 * tags:
 *   name: Carts
 *   description: Giỏ hàng theo user
 */

/**
 * @openapi
 * /api/carts/{userId}:
 *   get:
 *     summary: Lấy giỏ hàng của 1 user
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Giỏ hàng của user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Không tìm thấy giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.get("/:userId", getCart)

/**
 * @openapi
 * /api/carts/{userId}:
 *   patch:
 *     summary: Cập nhật (thay thế) danh sách items trong giỏ hàng của user
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartInput'
 *     responses:
 *       200:
 *         description: Giỏ hàng sau khi cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.patch("/:userId", updateCart)

export default routes
