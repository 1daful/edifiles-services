import { IClient } from "./IClient"
import { ApiRequest } from "../api/Request";

export class FetchClient implements IClient{
    constructor(url: string) {
        this.baseUrl = url
    }
    
    baseUrl: string

    async get(request: ApiRequest) {
        const result = await fetch(`${this.baseUrl}/${request.url}`, request.config)
        const data = await result.json()
        let error

        if (!result.ok) {
             error = result.status
        }

        return {
            loading: result,
            data,
            error
        }
    }

    async post(request: ApiRequest) {
        let g: RequestInit = {}
        const result = await fetch(request.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.data)
        })
        const data = await result.json()
        let error

        if (!result.ok) {
             error = result.status
        }

        return {
            loading: result,
            data,
            error
        }
    }

}