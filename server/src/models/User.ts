import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string; // hashed, không lưu plaintext
	role: 'customer' | 'admin';
}

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		password: { type: String, required: true },
		role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
	},
	{ timestamps: true }
);

export default model<IUser>('User', userSchema);
