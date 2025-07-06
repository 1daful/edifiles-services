import axios from "axios";
import { IClient } from "./IClient";
import { ApiRequest } from "../api/Request";
import { ApiConfig } from "../utility/Types";
import { getAndCache } from "../utility/Utility";

export class AxiosClient implements IClient{
    constructor(apiConfig: ApiConfig) {
        this.apiConfig = apiConfig
    }
    async get(request: ApiRequest) {
        const url = this.apiConfig.baseUrl + request.url
        Object.assign(this.apiConfig.baseConfig, request.config)
        if(request.cacheKey) {
            return getAndCache(request, () => axios.get(url, {
                params: this.apiConfig.baseConfig
            }))
        }

        else {
            return axios.get(url, {
            params: this.apiConfig.baseConfig
        })
        }
    }
    async post(request: ApiRequest) {
        const url = this.apiConfig.baseUrl + request.url
        const config = this.apiConfig.baseConfig
        Object.assign(config, request.config)
        if (request.cacheKey) {
            return getAndCache(request, () => axios.post(url, request.data, {
            params: config,
            data: request.data
        }))
        }

        else {
            return axios.post(url, request.data, {
            params: config,
            data: request.data
        })
        }

        
    }
    apiConfig: ApiConfig
}