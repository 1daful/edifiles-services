import { IClient } from "./IClient";

export class Client{
    constructor(client: IClient) {
        this.client = client
    }

    async get<T>(Type: new (data: any) => T, parameters?: any) {
        const data = await this.client.get(`${Type.name}`, parameters)
        const dataView =  new Type(data)
        return dataView
    }

    async post<T>(Type: new (data: any) => T, postData: any, parameters?: any) {
        const data = await this.client.post(`${Type.name}`, postData, parameters)
        const dataView =  new Type(data)
        return dataView
    }

    client
}