import { Client } from "../clients/Client";
import { RestClient } from "../clients/RestClient";
import { ApiConfig, ApiRequest, RequestConfig } from "../utility/Types";
import { Callback } from "./Callback";

export class Api {
    constructor(apiConfig: ApiConfig, callbackConfig?: ApiConfig) {
        this.apiConfig = apiConfig
        if (callbackConfig) this.callback = new Callback(callbackConfig)
    }
    client = new RestClient()
    callback?: Callback
    reqConfig: any;
    backEndApi: any;
    apiConfig: ApiConfig;
    private requests: ApiRequest[] = []

    makeRequest(request: RequestConfig, ) {
        const params = this.apiConfig.params
        const url = this.apiConfig.endPoint + request.endPoint
        if (params && request.params) Object.assign(params, request.params)
        const req: ApiRequest =  {
            url: url,
            params: params,
            transform: request.transform,
            data: request.data,
            method: request.method,
            cacheKey: request.cacheKey,
        }
        return req
    }
    async runRequest(request: ApiRequest | RequestConfig, client: Client = this.client): Promise<any[]> {
        let req: ApiRequest;
        if ('endPoint' in request && request.endPoint !== undefined) {
            req = this.makeRequest(request)
        }
        else req = request as ApiRequest;
        let data: any[];
        switch (req.method) {
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
                throw new Error(`Unsupported method type: ${req.method}`);
        }
        return data
    }

    /**
     * Sends a POST request using the provided client with a callback configuration and a list of API configurations.
     *
     * @param configs - An array of `ApiConfig` objects representing the API requests to be included in the callback data.
     * @param callbackConfig - The `ApiConfig` object used as the base for the callback request.
     * @param client - (Optional) The `Client` instance to use for sending the request. Defaults to `this.client` if not provided.
     * @returns A promise resolving to the result of the client's `post` method with the constructed callback request.
     */
    addRequest(configs: RequestConfig[], callbackConfig: RequestConfig, client: Client = this.client) {
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