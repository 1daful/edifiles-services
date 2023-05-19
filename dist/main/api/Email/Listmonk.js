//import { emailReq } from '../../utility/Types';
import config from "../../utility/config.json";
import { Resource } from '../Resource';
import { Axiosi } from "../Axiosi";
export class ListMonk {
    client = new Axiosi();
    resources = [];
    transact = (format) => {
        return new Resource(this, "transactionalEmail", {
            name: "emailReq",
            baseUrl: "/api/tx",
            params: {},
            data: {
                subscriber_email: format.address,
                subscriber_id: format.userId,
                template_id: format.templateKey,
                data: format.data,
                headers: format.headers /*[]*/,
                content_type: format.contentType /*"html" | "markdown" | "plain"*/
            }
        }, "emailResp");
    };
    transactionalResponse = {
        "data": true
    };
    campaign = (format) => {
        new Resource(this, "", {
            baseUrl: "/api/campaigns",
            name: "",
            params: {},
            data: {
                name: format.name,
                subject: format.subject,
                lists: format.lists,
                from_email: format.address,
                type: format.type,
                content_type: format.contentType,
                body: format.body,
                //altbody: format.altbody,
                //send_at: format.date,
                messenger: format.messenger,
                template_id: format.templateKey,
                tags: format.tags
            }
        }, "campaignResp");
    };
    campaignPostResponse = {
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
    subscriber = (format, data) => {
        new Resource(this, "contacts", {
            name: "subscriber",
            baseUrl: "/subscribers",
            params: {
                page: format.page,
                per_page: format.per_page
            },
            data: {
                name: data.name,
                email: data.address,
                status: data.status,
                lists: data.lists,
                attribs: data.attributes,
                preconfirm_subscriptions: data.preconfirmedSub
            }
        }, "subscriber");
    };
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
