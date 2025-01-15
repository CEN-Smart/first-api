import express, { Request, Response } from 'express';

const updateRouter = express.Router();

updateRouter.post('/update', (req: Request, res: Response) => {});
updateRouter.get('/update', (req: Request, res: Response) => {});
updateRouter.get('/update/:id', (req: Request, res: Response) => {});
updateRouter.put('/update/:id', (req: Request, res: Response) => {});
updateRouter.delete('/update/:id', (req: Request, res: Response) => {});

export default updateRouter;
