"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const Listmonk_1 = require("./Listmonk");
const Zeptomail_1 = require("./Zeptomail");
const Axiosi_1 = require("../Axiosi");
const config_json_1 = __importDefault(require("../../utility/config.json"));
const userViewResolver_1 = require("../../viewResolver/userViewResolver");
class Mailer {
    client = new Axiosi_1.Axiosi();
    sender = config_json_1.default.email.address;
    host = "smtp.zeptomail.com";
    messenger = new Listmonk_1.ListMonk();
    @userViewResolver_1.userSignUp.submit.onResult
    sendEmail(email) {
        this.client.post(this.messenger.transact(email));
        /*let msg = {
            sender: this.sender,
            to: [user.address],
            msg: email.html,
            host: this.host
        }*/
        //this.client.postTo(config.backURL + "/mailer", msg)
    }
    sendTemplateEmail(user, email) {
        this.client.post(new Zeptomail_1.Zeptomail().getResource("single_template", user, email));
    }
    sendTemplateBatch(user, email) {
        this.client.post(new Zeptomail_1.Zeptomail().getResource("batch_template", user, email));
    }
}
exports.Mailer = Mailer;
//# sourceMappingURL=Mailer.js.map