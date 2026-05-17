import { Resend } from 'resend';

export class EmailDatasource {
    private readonly resend = new Resend(process.env.RESEND_API_KEY);
    private readonly from = process.env.FROM_EMAIL ?? 'cberna.alvaro@gmail.com';
    private readonly to = process.env.TO_EMAIL ?? 'onboarding@resend.dev';

    async sendEmail(subject: string, html: string): Promise<void> {
        await this.resend.emails.send({
            from: this.from,
            to: this.to,
            subject,
            html,
        });
    }
}
