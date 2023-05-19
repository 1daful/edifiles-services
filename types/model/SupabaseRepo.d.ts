import { IRepository } from "../model/IRepository";
export declare class SupabaseRepo implements IRepository {
    search(field: string, query: string, collName: string): Promise<any>;
    options: {
        db: {
            schema: string;
        };
        auth: {
            autoRefreshToken: boolean;
            persistSession: boolean;
            detectSessionInUrl: boolean;
        };
    };
    supabase: import("@supabase/supabase-js").SupabaseClient<any, string, any>;
    addItem(collName: string, items: Record<string, any>[]): Promise<any>;
    addItems(collName: string, items: Record<string, any>[]): Promise<any>;
    readItem(collName: string, field: string, value: string): Promise<Record<string, any>>;
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
    updateItem(newItem: any, oldItem: Record<string, any>, collName: string): Promise<void>;
    deleteItem(collName: string, item: any): Promise<void>;
    find(op: Record<string, any>, collName: string, _sort?: string, _limit?: number): Promise<void>;
}
