import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProduct,
} from '../handlers/products';

import { Router } from 'express';
import { validateData } from '../middlewares/schema-validator';
import { protectRoute } from '../modules/auth';
import { productSchema } from '../schemas/product';

const productRouter = Router();

productRouter
	.post('/product', [validateData(productSchema), protectRoute], createProduct)
	.get('/product', [protectRoute], getAllProducts)
	.get('/product/:id', [protectRoute], getProduct)
	.put(
		'/product/:id',
		[validateData(productSchema), protectRoute],
		updateProduct
	)
	.delete('/product/:id', [protectRoute], deleteProduct);

export default productRouter;
