import { ListMonk } from './Listmonk';
import { EmailType } from '../../utility/Types';
import { EmailAddress } from '../../utility/Types';
import { Axiosi } from '../Axiosi';
export declare class Mailer {
    client: Axiosi;
    sender: string;
    host: string;
    messenger: ListMonk;
    sendEmail(email: EmailType): void;
    sendTemplateEmail(user: EmailAddress[], email: EmailType): void;
    sendTemplateBatch(user: EmailAddress[], email: EmailType): void;
}
