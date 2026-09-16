import { Schema, model, Document, Types } from 'mongoose';

export enum OrderStatus {
	PENDING = 'pending',
	PAID = 'paid',
	SHIPPED = 'shipped',
	DELIVERED = 'delivered',
	CANCELLED = 'cancelled'
}

export interface IOrderItem {
	// FIX: Types.ObjectId thay vì Schema.Types.ObjectId (xem giải thích ở Category.ts)
	variantId: Types.ObjectId;
	productName: string;
	size?: string;
	color?: string;
	price: number;
	quantity: number;
}

export interface IOrder extends Document {
	userId: Types.ObjectId;
	items: IOrderItem[];
	totalAmount: number;
	status: OrderStatus;
	shippingAddress?: string;
}

const orderItemSchema = new Schema<IOrderItem>(
	{
		variantId: { type: Schema.Types.ObjectId, ref: 'Variant' },
		productName: { type: String, required: true },
		size: String,
		color: String,
		price: { type: Number, required: true },
		quantity: { type: Number, required: true, min: 1 },
	},
	{ _id: false }
);

const orderSchema = new Schema<IOrder>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		items: { type: [orderItemSchema], required: true },
		totalAmount: { type: Number, required: true, min: 0 },
		status: {
			type: String,
			enum: Object.values(OrderStatus),
			// FIX: dung OrderStatus.PENDING thay vi literal 'pending' -- literal string khong
			// tu duoc TS coi la thanh vien cua OrderStatus[] o enum phia tren, gay loi type
			default: OrderStatus.PENDING,
		},
		shippingAddress: String,
	},
	{ timestamps: true }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });

export default model<IOrder>('Order', orderSchema);
