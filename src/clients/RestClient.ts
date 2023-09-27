
import { FetchClient } from "./FetchClient";
import { Client } from "./Client";

export class RestClient extends Client{
    constructor(requestDetails: any) {
        super(new FetchClient(requestDetails))
    }

}