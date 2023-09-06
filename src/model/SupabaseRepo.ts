import { IRepository } from "../model/IRepository";
import config from "../utility/config.json";
import { createClient } from '@supabase/supabase-js';

export class SupabaseRepo implements IRepository {
    async search(field: string, query: string, collName: string): Promise<any> {
        let i = 0
            const { data, error } = await this.supabase
            .from(collName)
            .select()
            .textSearch(field, `'${query}'`)
            return { data, error };
    }
    options = {
        db: {
            schema: 'public',
        },
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
      }

    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, this.options);

    async addItem(collName: string, items: Record<string, any>[]): Promise<any> {
        return await this.supabase
              .from(collName)
              .insert(items)
    }

    async addItems(collName: string, items: Record<string, any>[]): Promise<any> {
        return await this.supabase
            .from(collName)
            .insert(items)
    }

    async readItem(collName: string, field: string, value: string): Promise<Record<string, any>> {
        const { data, error } = await this.supabase
        //.from(collName)
        //.select(*).eq(field, value)
        .from(collName)
        .select().eq(field, value)

        return data as unknown as Promise<Record<string, any>[]>
    }

    /*async readItems(collName: string, column?: string, foreignTable?: Record<string, any>, columns?: string, val?: any, limit?: number): Promise<Record<string, any>[]> {
        if(foreignTable && val && column) {
            const { data, error } = await this.supabase
            .from(collName)
            .select(`${foreignTable.key}, ${foreignTable.fColl}(${foreignTable.fKey})`)
            //.eq(`${params.fColl}.${params.fKey2}`, val)
            .eq(column, val)
            .limit(limit || 10)
            return data as unknown as Promise<Record<string, any>[]>
        }
        if(column && val && columns) {
            const { data, error } = await this.supabase
            .from(collName)
            .select(`${columns}`)
            //.eq(`${params.fColl}.${params.fKey2}`, val)
            .eq(column, val)
            .limit(limit || 10)
            return data as unknown as Promise<Record<string, any>[]>
        }
        const { data, error } = await this.supabase
        .from(collName)
        .select()
        .limit(limit || 10)

        return data as unknown as Promise<Record<string, any>[]>
        }*/

    async readItems(table: string, foreignTable?: {coll: string, key: string, fKey: string}, filters?: {prop: string, operator: any, value: string}[], range?: {lower: number, upper: number}, limit?: number) {
        let query: Function
        query = () => this.supabase.from(table).select()
        if(foreignTable) {
            query = () => this.supabase.from(table).select(`${foreignTable.key}, ${foreignTable.coll}(${foreignTable.fKey})`)
        }
        if(filters) {
            filters.forEach(filter => {
                query = () => query().filter(filter.prop, filter.operator, filter.value)
                //query = () => query().eq(filter.prop, filter.value)
            });
        }
        if(range) {
            query = query().range(range.lower, range.upper)
        }
        if(limit) {
            query = query().limit(limit)
        }
        const { data, error } = await query()
        return data as unknown as Promise<Record<string, any>[]>
    }
    async readQuery(tableName: string, ids: Array<string>) {
        return await this.supabase.rpc('select_items_by_ids', {
        table_name: tableName,
        ids: ids,
        });
    
        // Process the data as needed
      }
    async updateItem(newItem: any, oldItem: Record<string, any>, collName: string): Promise<void> {
        const { data, error } = await this.supabase
          .from(collName)
          .update(newItem)
          .match(oldItem)
    }

    async deleteItem(collName: string, item: any): Promise<void> {
        const { data, error } = await this.supabase
          .from(collName)
          .delete()
          .match(item)
    }
    async find(op: Record<string, any>, collName: string,_sort?: string, _limit?: number) {
        Object.keys(op).forEach(async key => {
            let i = 0
            const { data, error } = await this.supabase
            .from(collName)
            .select()
            .textSearch(key, `'${op[key]}'`)
            return { data, error };
        });
        
    }
}