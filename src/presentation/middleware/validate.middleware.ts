import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.log('error de validación, muy corto o muy largo')
        res.status(400).json({
            error: 'error de validación'
        });
        return;
    }

    req.body = result.data;
    next();
  };

