import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	description?: string;
	images: string[];
	// FIX: dùng Types.ObjectId, không phải Schema.Types.ObjectId (xem giải thích ở Category.ts)
	categoryId: Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
	{
		name: { type: String, required: true },
		description: String,
		images: { type: [String], default: [] },
		categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
	},
	{ timestamps: true }
);

export default model<IProduct>('Product', productSchema);
