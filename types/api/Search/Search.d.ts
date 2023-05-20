import { Meilisearch } from '../Search/meilisearch';
import { MediaRes } from '../../utility/Types';
import { MediaType } from '../../utility/Types';
export declare class Search {
    client: Meilisearch;
    index(type: MediaRes, items: MediaType[]): void;
    search(type: MediaRes, keyword: string): Promise<import("meilisearch").SearchResponse<Record<string, any>, import("meilisearch").SearchParams>>;
}
