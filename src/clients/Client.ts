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
    async get(name?: string, parameters?: any) {
        let data
        if (parameters) {
            data = await this.client.get(parameters)
        }
        else if (name) {
            data = await this.client.get(name)
        }
        else throw new Error("No argument given")
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
    async post<T>(name: string, postData: any, parameters?: any) {
        let data
        if (name) {
            data = await this.client.get(name)
        }
        else if (parameters) {
            data = await this.client.post(postData, parameters)
        }
        else throw new Error("No argument given");
        
        return data
    }

    client
}