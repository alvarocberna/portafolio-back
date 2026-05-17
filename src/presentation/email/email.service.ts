import { Request, Response, NextFunction } from 'express';
import { EmailRepository } from '../../infrastructure/email/repository/email.repository';
import { SendEmailDto } from './send-email.dto';

export class EmailService {
    constructor(private readonly emailRepository = new EmailRepository()) {}

    sendEmail = async (req: Request, res: Response, next: NextFunction) => {
        const { to, subject, html } = req.body as SendEmailDto;
        try {
            console.log('enviando email...');
            await this.emailRepository.sendEmail(to, subject, html);
            res.status(200).json({ message: 'Email enviado' });
        } catch (error) {
            console.error('Error al enviar email', error);
            next(new Error('No se pudo enviar el email'));
        }
    };
}
