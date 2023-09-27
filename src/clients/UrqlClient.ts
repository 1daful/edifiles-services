import { Client, useQuery, useMutation, ClientOptions, provideClient } from "@urql/vue";
import { DocumentNode } from "graphql";
import { IClient } from "./IClient";
import { config } from "../config";

export class UrqlClient implements IClient{
    constructor(url: string) {
        provideClient(new Client({
            url,
            exchanges: config.api.Urql.config.exchanges
        }))
    }

    provideClient(options: ClientOptions) {
        provideClient(new Client(options))
    }

    get(query: DocumentNode, variables?: any) {
        const result = useQuery({
            query: query,
            variables: variables
        })

        return {
            fetching: result.fetching,
            data: result.data,
            error: result.error
        }
    }

    async post(query: DocumentNode, data: any) {
        const result = useMutation(query)
        const res = await result.executeMutation(data)
        return {
            data: res.data,
            error: res.error
        }
    }

}