import rateLimit from 'express-rate-limit';

export const emailLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minuto
  max: 5,                // máx 5 emails por minuto
  message: 'Too many requests',
});

