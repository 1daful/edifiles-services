import { ApiClient } from '../../apiClient';
import config from '../../../public/config.json';
import { IMediaApi } from 'src/api/IMediaApi';
import { Resource } from '../Resource';
import { Axiosi } from '../Axiosi';

export type SearchType = "matchall" | "match" | "matchphrase" | 
"term" | "querystring" | "prefix" | "wildcard" | "fuzzy" | "daterange"

export class zincSearch implements IMediaApi {
    client: ApiClient = new Axiosi();
    resources: Resource[] = [];
    url = config.api.ZincSearch.baseUrl

    index = (type: string, items: Record<string, any>) => {
        return new Resource(this, "index", {
            name: "indexRes",
            baseUrl: this.url + "/_bulkv2",
            params: config.api.ZincSearch.config,
            data: {
                index: type,
                records: items
            }
        }, "indexResp")
    }

    search = (type: string, searchType: SearchType, term: string, maxResult: number) => {
        return new Resource(this, "searchRes", {
            name: "indexRes",
            baseUrl: this.url + "/" + type + "/_search",
            params: config.api.ZincSearch.config,
            data: {
                search_type: searchType,
                query:
                {
                    term: term,
                    start_time: "2021-06-02T14:28:31.894Z",
                    end_time: "2021-12-02T15:28:31.894Z"
                },
                from: 0, //# use together with max_results for paginated results.
                max_results: maxResult,
                _source: [] // Leave this as empty array to return all fields.
            }
        }, "searchResp")
    }
    
    getBaseUrl() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config?.api.ZincSearch.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
    }
    getBaseParams() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config?.api.ZincSearch.config
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }
    getData(resData: Record<string, any>): Record<string, any>[] {
        let respData: Record<string, any>[] = [];
        let mData: Record<string, any>
        return resData.hits.hits
    }

    SearchResult?: {
            took: number,
            timed_out: boolean,
            max_score: number,
            hits: {
                total: {
                    value: number
                },
                hits: [
                    {
                        _index: string,
                        _type: string,
                        _id: string,
                        _score: number,
                        timestamp: string,
                        _source: {
                            Athlete: string,
                            City: string
                            Country: string
                            Discipline: string
                            Event: string
                            Gender: string
                            Medal: string
                            Season: string
                            Sport: string
                            Year: number
                        }
                    }
                ]
            },
            buckets: any,
            error: string
        }

}