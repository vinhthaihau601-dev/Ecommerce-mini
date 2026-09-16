import { Schema, model, Document, Types } from 'mongoose';

export interface IVariant extends Document {
	// FIX: Types.ObjectId thay vì Schema.Types.ObjectId (xem giải thích ở Category.ts)
	productId: Types.ObjectId;
	color?: string;
	size?: string;
	price: number;
	stock: number;
}

const variantSchema = new Schema<IVariant>(
	{
		productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		color: String,
		size: String,
		price: { type: Number, required: true, min: 0 },
		stock: { type: Number, required: true, min: 0, default: 0 },
	},
	{ timestamps: true }
);

variantSchema.index({ productId: 1 });

export default model<IVariant>('Variant', variantSchema);
