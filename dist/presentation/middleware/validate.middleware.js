"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        console.log('error de validación, muy corto o muy largo');
        res.status(400).json({
            error: 'error de validación'
        });
        return;
    }
    req.body = result.data;
    next();
};
exports.validate = validate;
