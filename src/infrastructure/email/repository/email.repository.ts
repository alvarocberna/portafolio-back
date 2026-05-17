import { EmailDatasource } from '../datasource/email.datasource';

export class EmailRepository {
    constructor(private readonly datasource = new EmailDatasource()) {}

    async sendEmail(to: string, subject: string, html: string): Promise<void> {
        return this.datasource.sendEmail(to, subject, html);
    }
}
