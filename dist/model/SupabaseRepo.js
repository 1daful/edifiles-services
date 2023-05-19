import config from "../utility/config.json";
import { createClient } from '@supabase/supabase-js';
export class SupabaseRepo {
    async search(field, query, collName) {
        let i = 0;
        const { data, error } = await this.supabase
            .from(collName)
            .select()
            .textSearch(field, `'${query}'`);
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
    };
    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, this.options);
    async addItem(collName, items) {
        return await this.supabase
            .from(collName)
            .insert(items);
    }
    async addItems(collName, items) {
        return await this.supabase
            .from(collName)
            .insert(items);
    }
    async readItem(collName, field, value) {
        const { data, error } = await this.supabase
            //.from(collName)
            //.select(*).eq(field, value)
            .from(collName)
            .select().eq(field, value);
        return data;
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
    async readItems(table, foreignTable, filters, range, limit) {
        let query;
        query = () => this.supabase.from(table).select();
        if (foreignTable) {
            query = () => this.supabase.from(table).select(`${foreignTable.key}, ${foreignTable.coll}(${foreignTable.fKey})`);
        }
        if (filters) {
            filters.forEach(filter => {
                query = () => query().filter(filter.prop, filter.operator, filter.value);
                //query = () => query().eq(filter.prop, filter.value)
            });
        }
        if (range) {
            query = query().range(range.lower, range.upper);
        }
        if (limit) {
            query = query().limit(limit);
        }
        const { data, error } = await query();
        return data;
    }
    async updateItem(newItem, oldItem, collName) {
        const { data, error } = await this.supabase
            .from(collName)
            .update(newItem)
            .match(oldItem);
    }
    async deleteItem(collName, item) {
        const { data, error } = await this.supabase
            .from(collName)
            .delete()
            .match(item);
    }
    async find(op, collName, _sort, _limit) {
        Object.keys(op).forEach(async (key) => {
            let i = 0;
            const { data, error } = await this.supabase
                .from(collName)
                .select()
                .textSearch(key, `'${op[key]}'`);
            return { data, error };
        });
    }
}
