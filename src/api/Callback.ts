import { RestClient } from "../clients/RestClient";
import { config } from "../config";
import { ApiConfig } from "../utility/Types";
import { Request } from "./Request";

export class Callback {
    constructor(apiConfig: ApiConfig, url?: string) {
        if(url) {
            config.backEndApi.baseUrl = url
        }
        this.client = new RestClient(config.backEndApi)
        this.apiConfig = apiConfig
    }
    client: RestClient
    apiConfig

    get(backEndURL: string, request: Request) {
        const reqUrl = this.apiConfig.baseUrl + request.url
        const reqConfig = this.apiConfig
        Object.assign(reqConfig, request.config)

        const newReq: Request = {
            url: reqUrl,
            config: reqConfig,
        }
        const req: Request = {
            url: backEndURL,
            config: newReq,
        }
        this.client.get(req)
    }

    post(backEndRequest: Request) {
        const reqUrl = this.apiConfig.baseUrl + backEndRequest.data?.url
        const reqConfig = this.apiConfig
        Object.assign(reqConfig, backEndRequest.data?.config)

        const newReq: Request = {
            url: reqUrl,
            config: reqConfig,
            data: backEndRequest.data?.data
        }
        const req: Request = {
            url: backEndRequest.url,
            config: backEndRequest.config,
            data: newReq
        }
        this.client.post(req)
    }
}