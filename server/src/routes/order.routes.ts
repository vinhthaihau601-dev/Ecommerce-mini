import { Router } from "express";
import { createOrder, deleteOrder, getOrder, getOrders } from "../controllers/order.controller";
import { asyncHandler } from "../middlewares/asyncHandler";

const routes = Router()

// FIX: getOrder và getOrders trước đây cùng đăng ký chung path "/:userId" -> route đăng ký
// trước (getOrder) luôn thắng, getOrders (danh sách) chết, không bao giờ chạy tới.
// Giờ tách 2 path riêng: "/:userId" = danh sách, "/:userId/:id" = 1 order cụ thể.

/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: Đơn hàng theo user
 */

/**
 * @openapi
 * /api/orders/{userId}:
 *   get:
 *     summary: Lấy danh sách đơn hàng của 1 user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
routes.get("/:userId", asyncHandler(getOrders))

/**
 * @openapi
 * /api/orders/{userId}/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 đơn hàng của user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đơn hàng tương ứng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Không tìm thấy đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.get("/:userId/:id", asyncHandler(getOrder))

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Tạo đơn hàng mới
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Đơn hàng vừa tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.post("/", asyncHandler(createOrder))

/**
 * @openapi
 * /api/orders/{id}:
 *   delete:
 *     summary: Xoá đơn hàng
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.delete("/:id", asyncHandler(deleteOrder))

export default routes
