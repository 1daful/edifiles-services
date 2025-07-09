import { Client } from "../clients/Client";
import { ApiConfig, ApiRequest } from "../utility/Types";
import { Callback } from "./Callback";

export class Api {
    constructor(apiConfig: ApiConfig, client: Client, callbackConfig?: ApiConfig) {
        this.apiConfig = apiConfig
        this.client = client
        if (callbackConfig) this.callback = new Callback(callbackConfig)
    }
    client: Client
    callback?: Callback
    reqConfig: any;
    backEndApi: any;
    apiConfig: ApiConfig;
    private requests: ApiRequest[] = []

    makeRequest(request: ApiConfig) {
        const params = this.apiConfig.params
        const url = this.apiConfig.endPoint + request.endPoint
        if (params && request.params) Object.assign(params, request.params)
        const req: ApiRequest =  {
            url: url,
            params: params,
            transform: request.transform,
            data: request.data,
            methodType: request.methodType,
            cacheKey: request.cacheKey,
        }
        return req
    }
    async runRequest(request: ApiRequest | ApiConfig, client: Client = this.client): Promise<any[]> {
        let req: ApiRequest;
        if ('endPoint' in request && request.endPoint !== undefined) {
            req = this.makeRequest(request)
        }
        else req = request as ApiRequest;
        let data: any[];
        switch (req.methodType) {
            case 'get':
                data = (await client.get(req)).data;
                break;
            case 'post':
                data = (await client.post(req)).data;
                break;
            case 'put':
                data = (await client.put(req)).data;
                break;
            case 'delete':
                data = (await client.delete(req)).data;
                break;
            default:
                throw new Error(`Unsupported method type: ${req.methodType}`);
        }
        return data
    }

    addRequest(configs: ApiConfig[], callbackConfig: ApiConfig, client: Client = this.client) {
        const callBack = this.makeRequest(callbackConfig)
        const data: ApiRequest[] = []
        configs.forEach(config => {
            data.push(this.makeRequest(config))
        });
        callBack.data = data
        return client.post(callBack)
        //return this.getData(callBack)
    }

    getRequests() {
        return this.requests
    }

    
    static async getData(data: any, transform: Function): Promise<any> {
        let mediaContents
        mediaContents = data.map((dat: any) => {
            transform(dat)
        })
        
        return mediaContents
        ;
        }
}