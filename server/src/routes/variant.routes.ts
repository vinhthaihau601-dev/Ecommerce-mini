import { Router } from "express";
import {
    createVariant,
    deleteVariant,
    getVariant,
    getVariants,
    updateVariant,
} from "../controllers/variant.controller";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router()

/**
 * @openapi
 * tags:
 *   name: Variants
 *   description: Quản lý biến thể sản phẩm (màu/size/giá/tồn kho)
 */

/**
 * @openapi
 * /api/variants:
 *   get:
 *     summary: Lấy danh sách variant
 *     tags: [Variants]
 *     responses:
 *       200:
 *         description: Danh sách variant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Variant'
 */
router.get("/", asyncHandler(getVariants))

/**
 * @openapi
 * /api/variants/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 variant theo id
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Variant tương ứng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       404:
 *         description: Không tìm thấy variant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", asyncHandler(getVariant))

/**
 * @openapi
 * /api/variants:
 *   post:
 *     summary: Tạo variant mới
 *     tags: [Variants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VariantInput'
 *     responses:
 *       201:
 *         description: Variant vừa tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", asyncHandler(createVariant))

/**
 * @openapi
 * /api/variants/{id}:
 *   patch:
 *     summary: Cập nhật variant
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VariantInput'
 *     responses:
 *       200:
 *         description: Variant sau khi cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       404:
 *         description: Không tìm thấy variant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id", asyncHandler(updateVariant))

/**
 * @openapi
 * /api/variants/{id}:
 *   delete:
 *     summary: Xoá variant
 *     tags: [Variants]
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
 *         description: Không tìm thấy variant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", asyncHandler(deleteVariant))

export default router
