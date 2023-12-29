import { IClient } from "../../clients/IClient";
import { RestClient } from "../../clients/RestClient";
import { Resource } from "../Resource";

export class Scheduler implements IClient{
    constructor(url: string, client?: IClient) {
        if(client) {
            this.client = client
        }
        else {
            this.client = new RestClient(url)
        }
    }
    get(resource: Resource, auth?: any) {
        const config = {}
        config.headers = resource.getBaseParam().header;
        config.params = resource.getBaseParam().baseParams
        config.auth = auth
        return this.client.get(config)
    }
    post(resource: Resource, auth?: any) {
        const config = {}
        config.headers = resource.getBaseParam().header;
        config.params = resource.getBaseParam().baseParams;
        config.auth = auth
        return this.client.post(resource.request.data, config)
    }
    client: IClient
    url: string
}