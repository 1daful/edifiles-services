import { IClient } from "./IClient"

export class FetchClient implements IClient{
    constructor(requestDetails: any) {
        this.baseUrl = requestDetails.url
    }
    
    baseUrl: string

    async get(query: RequestInfo | URL, variables?: RequestInit) {
        const result = await fetch(`${this.baseUrl}/${query}`, variables)
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

    async post(query: RequestInfo | URL, postData: Record<string, any>, variables?: RequestInit) {
        const result = await fetch(query, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
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