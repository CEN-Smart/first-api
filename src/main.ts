import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routes/auth';
import productRouter from './routes/product';
import updateRouter from './routes/update';
import updatePointRouter from './routes/update-point';

dotenv.config();

const apiPrefix = process.env.API_PREFIX!;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: err.message });

	next();
});

app.use(apiPrefix, productRouter);
app.use(apiPrefix, updateRouter);
app.use(apiPrefix, updatePointRouter);
app.use(apiPrefix, authRouter);

export default app;
