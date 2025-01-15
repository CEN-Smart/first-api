import express, { Request, Response } from 'express';

const updatePointRouter = express.Router();

updatePointRouter.post('/update-point', (req: Request, res: Response) => {});
updatePointRouter.get('/update-point', (req: Request, res: Response) => {});
updatePointRouter.get('/update-point/:id', (req: Request, res: Response) => {});
updatePointRouter.put('/update-point/:id', (req: Request, res: Response) => {});
updatePointRouter.delete(
	'/update-point/:id',
	(req: Request, res: Response) => {}
);

export default updatePointRouter;
