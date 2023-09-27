import { UrqlClient } from "./UrqlClient";
import { Client } from "./Client";

export class GraphqlClient extends Client {
    constructor(url: string) {
        super(new UrqlClient(url))
    }
}