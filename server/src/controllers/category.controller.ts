import { Request, Response } from 'express';
import { Category } from '../models';

// GET /api/categories
export async function getCategories(_req: Request, res: Response) {
	const categories = await Category.find();
	res.json(categories);
}

// GET /api/categories/:id
export async function getCategory(req: Request, res: Response) {
	const category = await Category.findById(req.params.id);
	if (!category) return res.status(404).json({ error: 'Category not found' });
	res.json(category);
}

// POST /api/categories
export async function createCategory(req: Request, res: Response) {
	const { name, parentId } = req.body;
	if (!name) return res.status(400).json({ error: 'name is required' });

	const category = await Category.create({ name, parentId: parentId || null });
	res.status(201).json(category);
}

// PATCH /api/categories/:id
export async function updateCategory(req: Request, res: Response) {
	const { name, parentId } = req.body;
	const category = await Category.findByIdAndUpdate(
		req.params.id,
		{ ...(name !== undefined && { name }), ...(parentId !== undefined && { parentId }) },
		{ new: true }
	);
	if (!category) return res.status(404).json({ error: 'Category not found' });
	res.json(category);
}

// DELETE /api/categories/:id
export async function deleteCategory(req: Request, res: Response) {
	const category = await Category.findByIdAndDelete(req.params.id);
	if (!category) return res.status(404).json({ error: 'Category not found' });
	res.status(204).send();
}
