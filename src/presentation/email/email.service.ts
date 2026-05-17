require('dotenv').config();
import { Resend } from 'resend';
import { Request, Response, NextFunction } from 'express';

const resend = new Resend(process.env.RESEND_API_KEY);
const email_from = process.env.FROM_EMAIL ?? 'cberna.alvaro@gmail.com';
const email_to = process.env.TO_EMAIL ?? 'onboarding@resend.dev';

export class EmailService {


    async sendEmail(req: Request, res: Response, next: NextFunction){
        const { subject, html } = req.body;
        try{
            console.log('enviando email...')
            await resend.emails.send({
              from: email_from,
              to: email_to,
              subject: subject,
              html: html,
            });
            res.status(200).json({ message: 'Email enviado' });
            return;
        }catch(error){
            console.error('Error al enviar email', error);
            next(new Error('No se pudo enviar el email')); //op1
            // throw new Error('Error al enviar email'); //op2
        }
    }
}
