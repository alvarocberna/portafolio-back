import { Request, Response, NextFunction } from 'express';
import { EmailRepository } from '../../infrastructure/email/repository/email.repository';

export class EmailService {
    constructor(private readonly emailRepository = new EmailRepository()) {}

    sendEmail = async (req: Request, res: Response, next: NextFunction) => {
        const { subject, html } = req.body;
        try {
            console.log('enviando email...');
            await this.emailRepository.sendEmail(subject, html);
            res.status(200).json({ message: 'Email enviado' });
        } catch (error) {
            console.error('Error al enviar email', error);
            next(new Error('No se pudo enviar el email'));
        }
    };
}
