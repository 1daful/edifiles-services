import { Client } from "./Client";
import { AxiosClient } from "./AxiosClient";
import { ApiConfig } from "../utility/Types";

export class RestClient extends Client{
    constructor() {
        //super(new FetchClient(url))
        super(new AxiosClient())
    }
}