import { Meilisearch } from '../Search/Meilisearch';
import { Filter, MediaRes, Sort } from '../../utility/Types';
import { MediaType } from '../../utility/Types';
export class Search {
    //iSearch = new zincSearch()
    /*async index(type: string, items: any) {
        let indexRes = this.iSearch.index(type, items)
        return fetch(indexRes.request.baseUrl, {
            method: "POST",
            body: JSON.stringify(indexRes.request.data),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Basic " + btoa("admin:Complexpass#123")
            },
        })
    }
    async search(type: string, searchType: SearchType, term: string, maxResult: number) {
        let searchRes = this.iSearch.search(type, searchType, term, maxResult)
        console.log("Search: ", searchRes.request)
        return await fetch(searchRes.request.baseUrl, {
            method: "POST",
            body: JSON.stringify(searchRes.request.data),
            headers: {
                "Content-type": "application/json",  "Authorization": "Basic " + btoa("admin:Complexpass#123")
            },
        })
    }*/
    client = new Meilisearch()
    index(type: MediaRes, items: MediaType[]) {
        this.client.index(type, items)
    }

    async search(type: string, keyword: string,filter?: Filter, sort?: Sort) {
        return await this.client.search(type, keyword, filter, sort)
    }
}