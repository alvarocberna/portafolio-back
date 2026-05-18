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
exports.EmailService = void 0;
const email_repository_1 = require("../../infrastructure/email/repository/email.repository");
class EmailService {
    constructor(emailRepository = new email_repository_1.EmailRepository()) {
        this.emailRepository = emailRepository;
        this.sendEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { to, subject, html } = req.body;
            try {
                console.log('enviando email...');
                yield this.emailRepository.sendEmail(to, subject, html);
                res.status(200).json({ message: 'Email enviado' });
            }
            catch (error) {
                console.error('Error al enviar email', error);
                next(new Error('No se pudo enviar el email'));
            }
        });
    }
}
exports.EmailService = EmailService;
