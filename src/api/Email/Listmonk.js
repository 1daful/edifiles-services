import config from "../../../public/config.json";
import { Resource } from '../Resource';
import { Axiosi } from "../Axiosi";
export class ListMonk {
    constructor() {
        this.client = new Axiosi();
        this.resources = [];
        this.transact = (format) => {
            return new Resource(this, "transactionalEmail", {
                name: "emailReq",
                baseUrl: "/api/tx",
                params: {},
                data: {
                    subscriber_email: format.email,
                    subscriber_id: format.userId,
                    template_id: format.templateId,
                    data: format.data,
                    headers: format.headers /*[]*/,
                    content_type: format.contentType /*"html" | "markdown" | "plain"*/
                }
            }, "emailResp");
        };
        this.transactionalResponse = {
            "data": true
        };
        this.campaign = (format) => {
            new Resource(this, "", {
                baseUrl: "/api/campaigns",
                name: "",
                params: {},
                data: {
                    name: format.name,
                    subject: format.subject,
                    lists: format.lists,
                    from_email: format.email,
                    type: format.type,
                    content_type: format.contentType,
                    body: format.body,
                    altbody: format.altbody,
                    send_at: format.date,
                    messenger: format.messenger,
                    template_id: format.templateId,
                    tags: format.tags
                }
            }, "campaignResp");
        };
        this.campaignPostResponse = {
            "data": {
                "id": 1,
                "created_at": "2021-12-27T11:50:23.333485Z",
                "updated_at": "2021-12-27T11:50:23.333485Z",
                "views": 0,
                "clicks": 0,
                "bounces": 0,
                "lists": [{
                        "id": 1,
                        "name": "Default list"
                    }],
                "started_at": null,
                "to_send": 1,
                "sent": 0,
                "uuid": "90c889cc-3728-4064-bbcb-5c1c446633b3",
                "type": "regular",
                "name": "Test campaign",
                "subject": "Hello, world",
                "from_email": "listmonk \u003cnoreply@listmonk.yoursite.com\u003e",
                "body": "",
                "altbody": null,
                "send_at": null,
                "status": "draft",
                "content_type": "richtext",
                "tags": ["test"],
                "template_id": 1,
                "messenger": "email"
            }
        };
        this.subscriber = (format, data) => {
            new Resource(this, "contacts", {
                name: "subscriber",
                baseUrl: "/subscribers",
                params: {
                    page: format.page,
                    per_page: format.per_page
                },
                data: {
                    name: data.name,
                    email: data.email,
                    status: data.status,
                    lists: data.lists,
                    attribs: data.attributes,
                    preconfirm_subscriptions: data
                }
            }, "subscriber");
        };
    }
    getBaseUrl() {
        const apiBaseUrl = config.api.ListMonk.baseUrl;
        return apiBaseUrl;
    }
    getBaseParams() {
        const apiBaseParams = config.api.ListMonk.config;
        return apiBaseParams;
    }
    getData(resData) {
        //let mData: Record<string, any>
        /*for (const data of resData.items) {
            mData = {
                type: "books",
                id: data.id,
                status: '',
                privacy: '',
                tags: [],
                description: data.volumeInfo.description,
                genre: data.mainCategory,
                thumbnailSmall: data.volumeInfo.imageLinks.smallThumbnail,
                thumbnailLarge: data.volumeInfo.imageLinks.thumbnail,
                created: data.volumeInfo.publishedDate,
                license: '',
                title: data.volumeInfo.title,
                authors: data.authors,
                printType: data.printType //book or magazine
            }
            //this.volumeRes.response.dataList.push(mData);
            //respData.push(mData);
        }*/
        //let respData: Record<string, any>[] = this.subscriber.getData(resData.items);
        return resData;
    }
}
