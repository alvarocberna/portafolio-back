import { Router } from "express";
import { EmailService } from "./email.service";
import {verifyToken} from '../middleware/auth.middleware';
import {emailLimiter} from '../middleware/limiter.middleware';
import { validate } from '../middleware/validate.middleware';;
import { emailSchema } from '../schema/email.schema';

export class EmailRoutes {

    static get routes(): Router {

        const router = Router();
        const emailService = new EmailService();

        router.post('/send-email', verifyToken, emailLimiter, validate(emailSchema), emailService.sendEmail);

        return router;

    }

}