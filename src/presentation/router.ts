import { Router } from "express";
import { EmailRoutes } from "./email/routes";
import {verifyToken} from './middleware/auth.middleware';;

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/email', EmailRoutes.routes);

        return router;
    }

}