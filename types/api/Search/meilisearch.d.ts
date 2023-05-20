import { MeiliSearch } from 'meilisearch';
export declare class Meilisearch {
    configHost: string;
    client: MeiliSearch;
    constructor(host?: string);
    test(collName: string): void;
    search(collName: string, query: string): Promise<import("meilisearch").SearchResponse<Record<string, any>, import("meilisearch").SearchParams>>;
    index(collName: string, items: Record<string, any>[]): void;
}
