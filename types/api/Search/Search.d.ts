import { MediaRes } from 'src/Types.js';
import { MediaType } from 'src/Types.js';
import { Algolia } from './Algolia';
export declare class Search {
    client: Algolia;
    index(type: MediaRes, items: MediaType[]): void;
    search(type: MediaRes, keyword: string): Promise<any>;
}
