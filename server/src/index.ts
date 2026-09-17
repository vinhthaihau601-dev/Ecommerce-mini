import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import categoryRoutes from './routes/category.routes';
import userRoutes from './routes/user.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import variantRoutes from './routes/variant.routes';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json()); // parse JSON body — thiếu dòng này req.body sẽ undefined

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce-mini';

app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/variants', variantRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('MongoDB connected');
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	});
