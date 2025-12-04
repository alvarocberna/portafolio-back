require('dotenv').config();
import { Resend } from 'resend';
import { Request, Response } from 'express';

const resend = new Resend(process.env.RESEND_API_KEY);
const email_from = process.env.FROM_EMAIL ?? 'cberna.alvaro@gmail.com';
const email_to = process.env.TO_EMAIL ?? 'onboarding@resend.dev';

export class EmailService {

    async sendEmail(req: Request, res: Response){
        const { subject, html } = req.body;
        try{
            console.log('enviando email...')
            await resend.emails.send({
              from: email_from,
              to: email_to,
              subject: subject,
              html: html,
            });
            res.json('email enviado');
            return;
        }catch(error){
            console.log('error al enviar email')
            res.json('error al enviar email: ' + error);
            return;
        }
    }
}
