import axios from "axios";
import { IClient } from "./IClient";
import { ApiRequest } from "../utility/Types";

export class AxiosClient implements IClient{
    async get(request: ApiRequest) {
        return await axios.get(request.url, request.params)
    }

    async post(request: ApiRequest) {
        return await axios.post(request.url,
             request.data, request.params)
    }
}