import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import type { User } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

dotenv.config();

export const generateToken = (user: User) => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT_SECRET is not defined');
	}
	return jwt.sign({ id: user.id, username: user.username }, secret, {
		expiresIn: '30d',
	});
};

export const hashPassword = async (password: string) => {
	return bcryptjs.hash(password, 10);
};

export function lowercaseString(str: string) {
	return str.toLowerCase();
}

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => {
	return bcryptjs.compare(password, hashedPassword);
};

export const protectRoute: RequestHandler = (req, res, next) => {
	const bearer = req.headers.authorization;
	const secret = process.env.JWT_SECRET;

	if (!bearer || !bearer.startsWith('Bearer ')) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const token = bearer.split(' ').pop();

	if (!token) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	try {
		if (!secret) {
			res.status(500).json({ message: 'JWT_SECRET is not defined' });
			return;
		}
		const user = jwt.verify(token, secret) as User;
		req.user = user;
		next();
	} catch (error: unknown) {
		if (error instanceof JsonWebTokenError) {
			if (error.message.includes('invalid signature')) {
				res.status(401).json({ message: 'Invalid token' });
				return;
			}
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
	}
};
