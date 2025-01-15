import { createNewUser, forgotPassword, loginUser } from '../handlers/user';

import { Router } from 'express';
import { validateData } from '../middlewares/schema-validator';
import { loginSchema } from '../schemas/login-schema';
import { signupSchema } from '../schemas/signup-schema';
import { updatePasswordSchema } from '../schemas/update-password-schema';

const authRouter = Router();

authRouter
	.post('/auth/login', [validateData(loginSchema)], loginUser)
	.post('/auth/sign-up', [validateData(signupSchema)], createNewUser)
	.post(
		'/user/forgot-password',
		[validateData(updatePasswordSchema)],
		forgotPassword
	);

export default authRouter;
