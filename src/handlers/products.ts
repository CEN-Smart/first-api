import { Product } from '@prisma/client';
import { RequestHandler } from 'express';
import { db } from '../db';

// Get all products
export const getAllProducts: RequestHandler = async (req, res) => {
	try {
		const productUser = await db.user.findFirst({
			where: {
				id: req?.user?.id,
			},
			include: {
				products: true,
			},
		});
		if (!productUser) {
			res.status(401).json({
				message: 'Unauthorized',
			});
			return;
		}
		const products = productUser.products;

		res.json({
			status: 'success',
			totalProducts: products.length,
			data: { products },
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
			return;
		}
	}
};

// Get a single product
export const getProduct: RequestHandler = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await db.product.findFirst({
			where: {
				id,
				belongsTo: {
					id: req.user?.id,
				},
			},
		});

		if (!product) {
			res.status(404).json({ status: 'fail', message: 'Product not found' });
			return;
		}

		res.json({ data: product });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
			return;
		}
	}
};

// Create a product

export const createProduct: RequestHandler = async (req, res) => {
	const { name } = req.body as Product;

	try {
		const product = await db.product.create({
			data: {
				name,
				belongsTo: {
					connect: {
						id: req.user?.id,
					},
				},
			},
		});

		res.status(201).json({ status: 'success', data: product });
	} catch (error: unknown) {
		if (error instanceof Error) {
			if (error.message.includes('Unique constraint failed')) {
				res.status(400).json({
					status: 'fail',
					message: `Product with name ${name} already exists`,
				});
				return;
			}
			res.status(500).json({ message: error.message });
			return;
		}
	}
};

// Update a product
export const updateProduct: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const { name } = req.body as Product;

	try {
		const product = await db.product.update({
			where: {
				id,
				belongsTo: {
					id: req.user?.id,
				},
			},
			data: {
				name,
				updatedAt: new Date(),
			},
		});

		res.json({ status: 'success', data: product });
	} catch (error: unknown) {
		console.log(error);

		if (error instanceof Error) {
			if (error.message.includes('not found')) {
				res.status(400).json({
					status: 'fail',
					message: `Product with id ${id} not found`,
				});
				return;
			}
			if (error.message.includes('Unique constraint failed')) {
				res.status(400).json({
					status: 'fail',
					message: `The product with name ${name} does not match the id ${id} provided`,
				});
				return;
			}
			res.status(500).json({ message: error.message });
		}
	}
};

// Delete a product
export const deleteProduct: RequestHandler = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await db.product.delete({
			where: {
				id,
				belongsTo: {
					id: req.user?.id,
				},
			},
		});

		res.status(204).json({ status: 'success', data: product });
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('not found')) {
				res.status(400).json({
					status: 'fail',
					message: `Product with id ${id} not found`,
				});
				return;
			}
			res.status(500).json({ message: error.message });
		}
	}
};
