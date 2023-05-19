import { MediaRes } from 'src/Types.js';
import { MediaType } from 'src/Types.js';
export declare class Algolia {
    indexes: Record<string, any>;
    client: any;
    index(type: MediaRes, items: MediaType[]): void;
    search(type: MediaRes, keywords: string): Promise<any>;
}
