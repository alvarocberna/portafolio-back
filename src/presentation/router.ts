import { Router } from "express";
import { EmailRoutes } from "./email/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/email', EmailRoutes.routes);

        return router;
    }

}