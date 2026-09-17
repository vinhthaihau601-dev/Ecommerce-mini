import { Router } from 'express';
import {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
} from '../controllers/category.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: Quản lý danh mục sản phẩm
 */

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Lấy danh sách category
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Danh sách category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', asyncHandler(getCategories));

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 category theo id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category tương ứng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Không tìm thấy category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', asyncHandler(getCategory));

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Tạo category mới
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category vừa tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', asyncHandler(createCategory));

/**
 * @openapi
 * /api/categories/{id}:
 *   patch:
 *     summary: Cập nhật category
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category sau khi cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Không tìm thấy category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id', asyncHandler(updateCategory));

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Xoá category
 *     tags: [Categories]
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
 *         description: Không tìm thấy category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', asyncHandler(deleteCategory));

export default router;
