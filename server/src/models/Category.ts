import { Schema, model, Document, Types } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	// FIX: interface phải dùng Types.ObjectId (kiểu giá trị thật lúc runtime) — Schema.Types.ObjectId
	// là class SchemaType dùng để khai báo schema bên dưới, không phải kiểu dữ liệu của field
	parentId?: Types.ObjectId;
}

const categorySchema = new Schema<ICategory>(
	{
		name: { type: String, required: true },
		parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
	},
	{ timestamps: true }
);

export default model<ICategory>('Category', categorySchema);
