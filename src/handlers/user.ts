import {
	comparePassword,
	generateToken,
	hashPassword,
	lowercaseString,
} from '../modules/auth';

import { User } from '@prisma/client';
import { RequestHandler } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { loginSchema } from '../schemas/login-schema';
import { updatePasswordSchema } from '../schemas/update-password-schema';

export const createNewUser: RequestHandler = async (req, res) => {
	const { username, password } = req.body as User;

	try {
		const hashedPassword = await hashPassword(password);

		const user = await db.user.create({
			data: { username: lowercaseString(username), password: hashedPassword },
		});

		res.json({ message: `User ${user.username} created successfully` });
	} catch (error: unknown) {
		if (error instanceof Error) {
			if (error.message.includes('Unique constraint')) {
				res.status(409).json({ message: 'Username already exists' });
				return;
			}
		}
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

export const loginUser: RequestHandler = async (req, res) => {
	const { username, password } = req.body as z.infer<typeof loginSchema>;

	const user = await db.user.findUnique({
		where: { username: lowercaseString(username) },
	});

	if (!user) {
		res.status(404).json({ message: 'User not found' });
		return;
	}

	const isPasswordMatch = await comparePassword(password, user.password);

	if (!isPasswordMatch) {
		res.status(401).json({ message: 'Invalid password' });
		return;
	}

	const token = generateToken(user);

	res.json({ message: `Welcome back ${user.username}`, data: { token } });
};

export const forgotPassword: RequestHandler = async (req, res) => {
	const { username, newPassword } = req.body as z.infer<
		typeof updatePasswordSchema
	>;

	try {
		const hashedPassword = await hashPassword(newPassword);

		const user = await db.user.findUnique({
			where: { username: lowercaseString(username) },
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		await db.user.update({
			where: { id: user.id },
			data: { password: hashedPassword },
		});

		res.json({ message: 'Password updated successfully' });
	} catch (error: unknown) {
		res.status(500).json({
			message: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};
