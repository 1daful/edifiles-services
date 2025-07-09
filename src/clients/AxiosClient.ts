import axios from "axios";
import { IClient } from "./IClient";
import { ApiConfig, ApiRequest } from "../utility/Types";

export class AxiosClient implements IClient{
    constructor() {
    }
    async get(request: ApiRequest) {
        return await axios.get(request.url, {
            params: request.params
        })
    }

    async post(request: ApiRequest) {
        return axios.post(request.url, request.data, request.params)
    }
}