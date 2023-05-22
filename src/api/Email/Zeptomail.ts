import { emailReq } from '../../utility/Types';
import { IMediaApi } from '../IMediaApi';
import { Resource } from './../Resource';
import { Axiosi } from './../Axiosi';
import config from "../../utility/config.json";
import { EmailAddress, EmailType } from "../../utility/Types";
export class Zeptomail implements IMediaApi{
    /*constructor() {
        this.user = user,
        this.email = email
    }*/
    //user
    //email
    resources: Resource[] = [];
    //"client_id" "h2QN0xKvn2yEbGzLAzt__xrgVQI_AVu2Gwn3WdZn0gE"
    getBaseUrl() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config.api.Zeptomail.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
    }
    getBaseParams() {
        const apiBaseParams = config.api.Zeptomail.config
        return apiBaseParams
    }
    getData(res: Record<string, any>[]): Record<string, any>[] {
        return res
    }
    admin = [{
        address: config.email.address,
        name: config.email.name
    }]

    getResource(req: emailReq, user: EmailAddress[], email: EmailType) {
        switch (req) {
            case "single":
                return new Resource(this, {
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
                }})
            case "single_template":
                return new Resource(this, {
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
                })
            case "batch_template":
                return new Resource(this, {
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
                })
        
            default:
                
                return new Resource(this, {
                    name: "",
                    baseUrl: "",
                    params: {}
                });
        }
    }

    //token = config.api.Zeptomail.token;
    //url =   config.api.Zeptomail.url
    client = new Axiosi(); 

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