import axios from "axios";
import { IClient } from "./IClient";
import { Request } from "../api/Request";
import { ApiConfig } from "../utility/Types";

export class AxiosClient implements IClient{
    constructor(apiConfig: ApiConfig) {
        this.apiConfig = apiConfig
    }
    async get(request: Request) {
        const url = this.apiConfig.baseUrl + request.url
        const config = this.apiConfig.baseConfig
        Object.assign(config, request.config)
        return await axios.get(url, {
            params: config
        })
    }
    async post(request: Request) {
        const url = this.apiConfig.baseUrl + request.url
        const config = this.apiConfig.baseConfig
        Object.assign(config, request.config)
        return await axios.post(url, request.data, {
            params: config,
            data: request.data
        })
    }
    apiConfig: ApiConfig
}