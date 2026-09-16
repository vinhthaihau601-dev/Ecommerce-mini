import { Schema, model, Document, Types } from 'mongoose';

export interface ICartItem {
	// FIX: Types.ObjectId thay vì Schema.Types.ObjectId (xem giải thích ở Category.ts)
	variantId: Types.ObjectId;
	quantity: number;
}

export interface ICart extends Document {
	userId: Types.ObjectId;
	items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>(
	{
		variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: true },
		quantity: { type: Number, required: true, min: 1 },
	},
	{ _id: false }
);

const cartSchema = new Schema<ICart>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
		items: { type: [cartItemSchema], default: [] },
	},
	{ timestamps: true }
);

export default model<ICart>('Cart', cartSchema);
