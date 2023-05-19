import { IRepository } from "./IRepository";
export declare class Gorsedb implements IRepository {
    addItem(item?: Record<string, any> | undefined): void;
    addItems(param: Record<string, any>[], collName?: string | undefined): void;
    readItem(collName?: string | undefined): Promise<Record<string, any>>;
    readItems(collName?: string | undefined, params?: string[] | undefined, op?: Record<string, any> | undefined): Promise<Record<string, any>[]>;
    updateItem(docId: any, param: Record<string, any>, collName?: string | undefined): void;
    deleteItem(docId: any, collName?: string | undefined): void;
    find(filters?: Record<string, any> | undefined, collName?: string | undefined): Promise<any>;
    search(field: string, query: string, collName?: string | undefined): Promise<any>;
}
