import { Api } from "../api/Api";
import { ApiRequest } from "../utility/Types";
import { getAndCache } from "../utility/Utility";
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
    async get(request: ApiRequest) {
        let response
        let data: any[]
        if(request.cacheKey) {
            response =  await getAndCache(request, () => this.client.get(request))
        }
        
        else {
            response =  await this.client.get(request)
        }
        
        data = response.data;

        if (request.transform) {
            return Api.getData(data, request.transform)
        }
        else {
            return data;
        }
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
    async post(request: ApiRequest) {
        let response
        let data: any[]
        if(request.cacheKey) {
            response =  await getAndCache(request, () => this.client.get(request))
        }
        
        else {
            response =  await this.client.get(request)
        }
        
        data = response.data;

        if (request.transform) {
            return Api.getData(data, request.transform)
        }
        else {
            return data;
        }
    }
    
    async put(request: any) {
        let data = await this.client.post(request)
        return data
    }
    async delete(request: any) {
        let data = await this.client.post(request)
        return data
    }

    client
}