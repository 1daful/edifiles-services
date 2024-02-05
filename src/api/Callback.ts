import { RestClient } from "../clients/RestClient";
import { config } from "../config";
import { ApiConfig } from "../utility/Types";
import { Request } from "./Request";

export class Callback {
    constructor(reqConfig: ApiConfig, backEndApi?: ApiConfig) {
        if(backEndApi) {
            config.backEndApi = backEndApi
        }
        this.client = new RestClient(config.backEndApi)
        this.reqConfig = reqConfig
    }
    client: RestClient
    reqConfig

    get(backEndURL: string, request: Request) {
        const reqUrl = this.reqConfig.baseUrl + request.url
        const reqConfig = this.reqConfig
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

    fetch(backEndRequest: Request) {
        const reqUrl = this.reqConfig.baseUrl + backEndRequest.data?.url
        const reqConfig = this.reqConfig.baseConfig
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