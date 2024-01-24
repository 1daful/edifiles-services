import { ListMonk } from './Listmonk';
import { EmailType } from '../../utility/Types';
import { EmailAddress } from '../../utility/Types';
import { Zeptomail } from './Zeptomail';
import { Axiosi } from '../Axiosi';
import config from "../../utility/config.json"

export class Mailer {
    client = new Axiosi(config)
    sender = config.email.address
    host = "smtp.zeptomail.com"
    messenger = new ListMonk()
    
sendEmail(email: EmailType) {
        this.client.post(this.messenger.transact(email))
        /*let msg = {
            sender: this.sender,
            to: [user.address],
            msg: email.html,
            host: this.host
        }*/
        //this.client.postTo(config.backURL + "/mailer", msg)
    }
    sendTemplateEmail(user: EmailAddress[], email: EmailType) {
        this.client.post(new Zeptomail().getResource("single_template", user, email))
    }
    sendTemplateBatch(user: EmailAddress[], email: EmailType) {
        this.client.post(new Zeptomail().getResource("batch_template", user, email))
    }
}