"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zeptomail = void 0;
const Resource_1 = require("./../Resource");
const Axiosi_1 = require("./../Axiosi");
const config_json_1 = __importDefault(require("../../utility/config.json"));
class Zeptomail {
    /*constructor() {
        this.user = user,
        this.email = email
    }*/
    //user
    //email
    resources = [];
    //"client_id" "h2QN0xKvn2yEbGzLAzt__xrgVQI_AVu2Gwn3WdZn0gE"
    getBaseUrl() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config_json_1.default.api.Zeptomail.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseParams() {
        const apiBaseParams = config_json_1.default.api.Zeptomail.config;
        return apiBaseParams;
    }
    getData(res) {
        return res;
    }
    admin = [{
            address: config_json_1.default.email.address,
            name: config_json_1.default.email.name
        }];
    getResource(req, user, email) {
        switch (req) {
            case "single":
                return new Resource_1.Resource(this, "email", {
                    name: "emailReq",
                    baseUrl: "/email",
                    params: {},
                    data: {
                        bounce_address: config_json_1.default.email.bounceAddress,
                        from: {
                            address: config_json_1.default.email.address,
                            name: config_json_1.default.email.name
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
                return new Resource_1.Resource(this, "email", {
                    name: "templateReq",
                    baseUrl: "/email/template",
                    params: {},
                    data: {
                        mail_template_key: email.templateKey,
                        bounce_address: config_json_1.default.email.bounceAddress,
                        from: {
                            address: config_json_1.default.email.address,
                            name: config_json_1.default.email.name
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
                return new Resource_1.Resource(this, "email", {
                    name: "tempBatch",
                    baseUrl: "/email/template/batch",
                    params: {},
                    data: {
                        mail_template_key: email.html,
                        bounce_address: config_json_1.default.email.bounceAddress,
                        from: {
                            address: config_json_1.default.email.address,
                            name: config_json_1.default.email.name
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
                return new Resource_1.Resource(this, "", {
                    name: "",
                    baseUrl: "",
                    params: {}
                }, "");
        }
    }
    //token = config.api.Zeptomail.token;
    //url =   config.api.Zeptomail.url
    client = new Axiosi_1.Axiosi();
}
exports.Zeptomail = Zeptomail;
//# sourceMappingURL=Zeptomail.js.map