import { UrqlClient } from "./UrqlClient";
import { Client } from "./Client";

export class GraphqlClient extends Client {
    constructor(config: any) {
        super(new UrqlClient(config))
    }
}

export { cacheExchange, fetchExchange } from "@urql/vue";