"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailDatasource = void 0;
const resend_1 = require("resend");
class EmailDatasource {
    constructor() {
        var _a;
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
        this.from = (_a = process.env.FROM_EMAIL) !== null && _a !== void 0 ? _a : 'cberna.alvaro@gmail.com';
    }
    sendEmail(to, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.resend.emails.send({
                from: this.from,
                to,
                subject,
                html,
            });
        });
    }
}
exports.EmailDatasource = EmailDatasource;
