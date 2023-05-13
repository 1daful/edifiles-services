import { ListMonk } from './Listmonk';
import { Zeptomail } from './Zeptomail';
import { Axiosi } from '../Axiosi';
import config from "../../../public/config.json";
export class Mailer {
    constructor() {
        this.sender = config.email.address;
        this.host = "smtp.zeptomail.com";
        this.messeger = new ListMonk();
        this.client = new Axiosi();
    }
    sendEmail(user, email) {
        this.client.post(this.messeger.transact(user));
        /*let msg = {
            sender: this.sender,
            to: [user.address],
            msg: email.html,
            host: this.host
        }*/
        //this.client.postTo(config.backURL + "/mailer", msg)
    }
    sendTemplateEmail(user, email) {
        this.client.post(new Zeptomail().getResource("single_template", user, email));
    }
    sendTemplateBatch(user, email) {
        this.client.post(new Zeptomail().getResource("batch_template", user, email));
    }
}
