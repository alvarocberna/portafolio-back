import { NextFunction, Request, Response } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-api-key'];

  if (!token || token !== process.env.INTERNAL_API_TOKEN) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}
