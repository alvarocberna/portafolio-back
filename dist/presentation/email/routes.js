"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRoutes = void 0;
const express_1 = require("express");
const email_service_1 = require("./email.service");
const auth_middleware_1 = require("../middleware/auth.middleware");
const limiter_middleware_1 = require("../middleware/limiter.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
;
const email_schema_1 = require("../schema/email.schema");
class EmailRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const emailService = new email_service_1.EmailService();
        router.post('/send-email', auth_middleware_1.verifyToken, limiter_middleware_1.emailLimiter, (0, validate_middleware_1.validate)(email_schema_1.emailSchema), emailService.sendEmail);
        return router;
    }
}
exports.EmailRoutes = EmailRoutes;
