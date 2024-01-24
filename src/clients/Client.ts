import { IClient } from "./IClient";

export class Client{
    constructor(client: IClient) {
        this.client = client
    }

    /*async get<T>(Type: new (data: any) => T, parameters?: any) {
        let data
        if (!parameters) {
            data = await this.client.get(Type.name)
        }
        else {
            data = await this.client.get(parameters)
        }
        const dataView =  new Type(data)
        return dataView
    }*/
    async get(request: any) {
        let data = await this.client.get(request)
        return data
    }

    /*async post<T>(Type: new (data: any) => T, postData: any, parameters?: any) {
        let data
        if (!parameters) {
            data = await this.client.get(Type.name)
        }
        else {
            data = await this.client.post(postData, parameters)
        }
        const dataView =  new Type(data)
        return dataView
    }*/
    async post(request: any) {
        let data = await this.client.get(request)
        return data
    }

    client
}