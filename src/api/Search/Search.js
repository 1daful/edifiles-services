var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Algolia } from './Algolia';
export class Search {
    constructor() {
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
        this.client = new Algolia;
    }
    index(type, items) {
        this.client.index(type, items);
    }
    search(type, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.search(type, keyword);
        });
    }
}
