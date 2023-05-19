import { IRepository } from "./IRepository";
import { MediaRes } from '@/Types.js';
export declare class Pouchdb implements IRepository {
    constructor(collName: string);
    search(field: string, query: string, collName?: string | undefined): Promise<any>;
    db: any;
    /**
     * Save index.
     * @param collName
     */
    addItem(item: Record<string, any>): Promise<Record<string, any>>;
    addItems(items: Record<string, any>[], collName?: MediaRes): Promise<void>;
    readItems(collName?: MediaRes, params?: string[], op?: Record<string, any>): Promise<Record<string, any>[]>;
    readItem(collName: MediaRes): Promise<any>;
    updateItem(docId: string, param: Record<string, any>): Promise<any>;
    deleteItem(docId: string): Promise<any>;
    private createIndex;
    /**
     * Each parameter provided are part of the find query object parameter.
     * @param sort
     * @param limit
     * @param op The op arg is used for knowing which comparison value to use.
     * @param params This array must follow the order of the op arg.
     */
    find(filters: Record<string, object>, sort?: string, limit?: number): Promise<any>;
}
