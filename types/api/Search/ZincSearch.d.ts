import { ApiClient } from '../../apiClient';
import { IMediaApi } from 'src/api/IMediaApi';
import { Resource } from '../Resource';
export type SearchType = "matchall" | "match" | "matchphrase" | "term" | "querystring" | "prefix" | "wildcard" | "fuzzy" | "daterange";
export declare class zincSearch implements IMediaApi {
    client: ApiClient;
    resources: Resource[];
    url: any;
    index: (type: string, items: Record<string, any>) => Resource;
    search: (type: string, searchType: SearchType, term: string, maxResult: number) => Resource;
    getBaseUrl(): any;
    getBaseParams(): any;
    getData(resData: Record<string, any>): Record<string, any>[];
    SearchResult?: {
        took: number;
        timed_out: boolean;
        max_score: number;
        hits: {
            total: {
                value: number;
            };
            hits: [
                {
                    _index: string;
                    _type: string;
                    _id: string;
                    _score: number;
                    timestamp: string;
                    _source: {
                        Athlete: string;
                        City: string;
                        Country: string;
                        Discipline: string;
                        Event: string;
                        Gender: string;
                        Medal: string;
                        Season: string;
                        Sport: string;
                        Year: number;
                    };
                }
            ];
        };
        buckets: any;
        error: string;
    };
}
