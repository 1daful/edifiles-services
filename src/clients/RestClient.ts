import { Client } from "./Client";
import { AxiosClient } from "./AxiosClient";
import { ApiConfig } from "../utility/Types";

export class RestClient extends Client{
    constructor(apiConfig: ApiConfig) {
        //super(new FetchClient(url))
        super(new AxiosClient(apiConfig))
    }
}