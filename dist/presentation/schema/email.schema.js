"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z.object({
    to: zod_1.z.string().email("email de destino inválido"),
    subject: zod_1.z.string().min(1, "subject requerido").max(200),
    html: zod_1.z.string().min(1, "html requerido").max(5000),
});
