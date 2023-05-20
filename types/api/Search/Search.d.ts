import { MediaRes } from 'src/Types.js';
import { MediaType } from 'src/Types.js';
export declare class Search {
    client: any;
    index(type: MediaRes, items: MediaType[]): void;
    search(type: MediaRes, keyword: string): Promise<any>;
}
