import { Resource } from './../Resource';
import { Axiosi } from './../Axiosi';
import config from "../../../public/config.json";
export class Zeptomail {
    constructor() {
        /*constructor() {
            this.user = user,
            this.email = email
        }*/
        //user
        //email
        this.resources = [];
        this.admin = [{
                address: config.email.address,
                name: config.email.name
            }];
        //token = config.api.Zeptomail.token;
        //url =   config.api.Zeptomail.url
        this.client = new Axiosi();
        /*sendMail(user: EmailAddress[], email: EmailType) {
            this.client.cle().then((resp: any) => console.log("success")).catch((error: any) => console.log("error"));
            }*/
        /*sendMailWithTemplate(user: EmailAddress[], email: EmailType) {
            this.client.sendMailWithTemplate(
                {
                mail_template_key: email.html,
                bounce_address: config.email.bounceAddress,
                from: {
                    address: config.email.address,
                    name: config.email.name
                },
                to: user,
                reply_to: this.admin,
                cc: email.cc,
                bcc: email.bcc,
                /*merge_info: {
                    contact_number: user.contact_number,
                    company: user.company
                },*/
        /*"client_reference": "<client reference>",
        "mime_headers": {
            "X-Test": "test"
        }
    }).then((resp: any) => console.log("success")).catch((error: any) => console.log("error"));
}*/
        /*sendBatchTemplate(user: EmailAddress[], email: EmailType) {
            this.client.mailBatchWithTemplate(
                {
                mail_template_key: email.html,
                bounce_address: config.email.bounceAddress,
                from: {
                    address: config.email.address,
                    name: config.email.name
                },
                to: user,
                reply_to: this.admin,
                /*"client_reference": "<client reference>",
                "mime_headers": {
                    "X-Test": "test"
                }
            }).then((resp: any) => console.log("success")).catch((error: any) => console.log("error"));
        }*/
    }
    //"client_id" "h2QN0xKvn2yEbGzLAzt__xrgVQI_AVu2Gwn3WdZn0gE"
    getBaseUrl() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config.api.Zeptomail.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseParams() {
        const apiBaseParams = config.api.Zeptomail.config;
        return apiBaseParams;
    }
    getData(res) {
        return res;
    }
    getResource(req, user, email) {
        switch (req) {
            case "single":
                return new Resource(this, "email", {
                    name: "emailReq",
                    baseUrl: "/email",
                    params: {},
                    data: {
                        bounce_address: config.email.bounceAddress,
                        from: {
                            address: config.email.address,
                            name: config.email.name
                        },
                        to: user,
                        reply_to: this.admin,
                        subject: email.subject,
                        textbody: email.text,
                        htmlbody: email.html,
                        cc: email.cc,
                        bcc: email.bcc,
                        track_clicks: true,
                        track_opens: true,
                        //"client_reference": "<client reference>", 
                        //mime_headers: { X-Zylker-User: "test-xxxx" }, 
                        attachments: email.attachments,
                        inline_images: email.inline_images
                    }
                }, "emailResp");
            case "single_template":
                return new Resource(this, "email", {
                    name: "templateReq",
                    baseUrl: "/email/template",
                    params: {},
                    data: {
                        mail_template_key: email.templateKey,
                        bounce_address: config.email.bounceAddress,
                        from: {
                            address: config.email.address,
                            name: config.email.name
                        },
                        to: user,
                        reply_to: this.admin,
                        cc: email.cc,
                        bcc: email.bcc,
                        /*merge_info: {
                            contact_number: user.contact_number,
                            company: user.company
                        },*/
                        /*"client_reference": "<client reference>",
                        "mime_headers": {
                            "X-Test": "test"
                        }*/
                    }
                }, "templateResp");
            case "batch_template":
                return new Resource(this, "email", {
                    name: "tempBatch",
                    baseUrl: "/email/template/batch",
                    params: {},
                    data: {
                        mail_template_key: email.html,
                        bounce_address: config.email.bounceAddress,
                        from: {
                            address: config.email.address,
                            name: config.email.name
                        },
                        to: user,
                        reply_to: this.admin,
                        /*"client_reference": "<client reference>",
                        "mime_headers": {
                            "X-Test": "test"
                        }*/
                    }
                }, "tempBatchResp");
            default:
                return new Resource(this, "", {
                    name: "",
                    baseUrl: "",
                    params: {}
                }, "");
        }
    }
}
