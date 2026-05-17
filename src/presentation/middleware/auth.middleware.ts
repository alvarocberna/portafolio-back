import { NextFunction, Request, Response } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-api-key'];

  if (!token || token !== process.env.INTERNAL_API_TOKEN) {
    //op1 - se envía directamente al front - simple y correcto
    // res.status(401).json({ error: 'Unauthorized' });
    // return;
    //op2 - pasa x el middleware global de error - más limpia y consistente en APIs grandes
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }

  next();
}
