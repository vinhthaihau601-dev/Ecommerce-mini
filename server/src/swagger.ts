import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Ecommerce Mini API',
			version: '1.0.0',
			description: 'API documentation cho backend Ecommerce Mini (category, product, variant, user, cart, order)',
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 3000}`,
				description: 'Local server',
			},
		],
		components: {
			schemas: {
				Category: {
					type: 'object',
					properties: {
						_id: { type: 'string' },
						name: { type: 'string' },
						slug: { type: 'string' },
						parentId: { type: 'string', nullable: true },
					},
				},
				Product: {
					type: 'object',
					properties: {
						_id: { type: 'string' },
						name: { type: 'string' },
						description: { type: 'string' },
						images: { type: 'array', items: { type: 'string' } },
						categoryId: { type: 'string' },
					},
				},
				ProductInput: {
					type: 'object',
					required: ['name', 'categoryId'],
					properties: {
						name: { type: 'string' },
						description: { type: 'string' },
						images: { type: 'array', items: { type: 'string' } },
						categoryId: { type: 'string' },
					},
				},
				Variant: {
					type: 'object',
					properties: {
						_id: { type: 'string' },
						productId: { type: 'string' },
						color: { type: 'string' },
						size: { type: 'string' },
						price: { type: 'number' },
						stock: { type: 'number' },
					},
				},
				VariantInput: {
					type: 'object',
					required: ['productId', 'price'],
					properties: {
						productId: { type: 'string' },
						color: { type: 'string' },
						size: { type: 'string' },
						price: { type: 'number' },
						stock: { type: 'number', default: 0 },
					},
				},
				User: {
					type: 'object',
					properties: {
						_id: { type: 'string' },
						name: { type: 'string' },
						email: { type: 'string', format: 'email' },
						role: { type: 'string', enum: ['customer', 'admin'] },
					},
				},
				UserInput: {
					type: 'object',
					required: ['name', 'email', 'password'],
					properties: {
						name: { type: 'string' },
						email: { type: 'string', format: 'email' },
						password: { type: 'string' },
						role: { type: 'string', enum: ['customer', 'admin'] },
					},
				},
				CartItem: {
					type: 'object',
					properties: {
						variantId: { type: 'string' },
						quantity: { type: 'number', minimum: 1 },
					},
				},
				Cart: {
					type: 'object',
					properties: {
						_id: { type: 'string' },
						userId: { type: 'string' },
						items: { type: 'array', items: { $ref: '#/components/schemas/CartItem' } },
					},
				},
				CartInput: {
					type: 'object',
					required: ['items'],
					properties: {
						items: { type: 'array', items: { $ref: '#/components/schemas/CartItem' } },
					},
				},
				OrderItem: {
					type: 'object',
					properties: {
						variantId: { type: 'string' },
						productName: { type: 'string' },
						size: { type: 'string' },
						color: { type: 'string' },
						price: { type: 'number' },
						quantity: { type: 'number' },
					},
				},
				Order: {
					type: 'object',
					properties: {
						_id: { type: 'string' },
						userId: { type: 'string' },
						items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
						totalAmount: { type: 'number' },
						status: { type: 'string' },
						shippingAddress: { type: 'string' },
					},
				},
				OrderInput: {
					type: 'object',
					required: ['userId', 'items', 'totalAmount'],
					properties: {
						userId: { type: 'string' },
						items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
						totalAmount: { type: 'number' },
						status: { type: 'string' },
						shippingAddress: { type: 'string' },
					},
				},
				Error: {
					type: 'object',
					properties: {
						error: { type: 'string' },
					},
				},
			},
		},
	},
	apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
