import { IRepository } from "./IRepository";
import { Pouchdb } from "./Pouchdb";
import { SupabaseRepo } from "./SupabaseRepo";
export declare class Repository implements IRepository {
    collName: string;
    constructor(collName?: string);
    search(field: string, query: string, collName?: string | undefined): Promise<any>;
    find(filters?: Record<string, any>, collName?: string, params?: string[]): Promise<any>;
    db: IRepository;
    changeDB(db: database, collName: string): Pouchdb | SupabaseRepo;
    addItem(collName: string, param: Record<string, any>): Promise<any>;
    addItems(collName: string, param: Record<string, any>[]): Promise<any>;
    readItem(coll: string, field: string, value: string): Promise<Record<string, any>>;
    readItems(table: string, foreignTable?: {
        coll: string;
        key: string;
        fKey: string;
    }, filters?: [{
        prop: string;
        operator: any;
        value: string;
    }], range?: {
        lower: number;
        upper: number;
    }, limit?: number): Promise<Record<string, any>[]>;
    updateItem(docId: any, param: Record<string, any>): void;
    deleteItem(docId: any): void;
}
type database = 'pouchdb' | 'supabase';
export {};
