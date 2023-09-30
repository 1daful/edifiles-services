import { IRepository } from "../model/IRepository";
import { config } from "../config";
import { createClient } from '@supabase/supabase-js';
import { IClient } from "../clients/IClient";
import { parseQuery } from "../utility/Query";
import { DocumentNode } from "graphql";

export class SupabaseRepo implements IRepository, IClient {
    async get(query: DocumentNode) {
        const jsonData = parseQuery(query)
        const selection = jsonData.definitions[0].selections[0]
        const selections = selection.selections?.map((selected)=>{
            return selected.name
        })

        let dbQuery: Function
        dbQuery = ()=> this.supabase
        .from(selection?.name)
        .select()

        if(selections) {
            dbQuery = ()=> dbQuery().select(...selections)
        }

        if (selection.arguments) {
            selection.arguments.forEach(args => {
                if(args.value) {
                    dbQuery = ()=> dbQuery().eq(args.name, args.value)
                }
                else if(args.values) {
                    dbQuery = ()=> dbQuery().eq(args.name, args.values)
                }
                else if(args.fields) {
                    args.fields.forEach(field => {
                        dbQuery = ()=> dbQuery().eq(args.name, args.fields)
                    });
                }
            });
        }

        return await dbQuery()
    }

    async post(query: DocumentNode) {
        const jsonData = parseQuery(query)
        const selection = jsonData.definitions[0].selections[0]
        const items = selection.arguments?.map((arg)=>{
            if(arg.value) {
                return { [arg.name]: arg.value }
            }
            if(arg.values) {
                return { [arg.name]: arg.values }
            }
            if(arg.fields) {
                return { [arg.name]: arg.fields }
            }
        })

        return await this.supabase
        .from(selection?.name)
        .insert(items)
    }

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
        return await this.supabase
        //.from(collName)
        //.select(*).eq(field, value)
        .from(collName)
        .select().eq(field, value)
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
        return await query()
    }
    async readQuery(tableName: string, ids: Array<string>) {
        return await this.supabase.rpc('select_items_by_ids', {
        table_name: tableName,
        ids: ids,
        });
    
        // Process the data as needed
      }
    async updateItem(newItem: any, oldItem: Record<string, any>, collName: string){
        return await this.supabase
          .from(collName)
          .update(newItem)
          .match(oldItem)
    }

    async deleteItem(collName: string, item: any) {
        return await this.supabase
          .from(collName)
          .delete()
          .match(item)
    }
    async find(op: Record<string, any>, collName: string,_sort?: string, _limit?: number) {
        Object.keys(op).forEach(async key => {
            let i = 0
            return await this.supabase
            .from(collName)
            .select()
            .textSearch(key, `'${op[key]}'`)
        });
        
    }
}