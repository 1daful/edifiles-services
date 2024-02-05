import { IRepository } from "../model/IRepository";
import { createClient } from '@supabase/supabase-js';
import { IClient } from "../clients/IClient";
import { parseQuery, filter } from "../utility/Query";
import { DocumentNode } from "graphql";
import { QueryType } from "../utility/Types";
import { isDocumentNode } from "../utility/Utility";

export class SupabaseRepo implements IRepository, IClient {
    constructor(config: any) {
        this.supabase = createClient(config.url, config.key, this.options);
    }
async readItemsWithDocumentNode(query: DocumentNode | string) {
    if (typeof query === 'string') {
        let dbQuery = this.supabase.from(query).select();
        return await dbQuery;
    }
    else {
        const jsonData = parseQuery(query);
        const selection = jsonData.definitions[0].selections[0];
      
        const selections = selection.selections?.map((selected) => selected.name);
      
        const args = selection.arguments;
      
        let dbQuery = this.supabase.from(selection?.name).select();
      
        if (selections) {
          dbQuery = this.supabase.from(selection?.name).select(selections.join());
        }
      
        if (args) {
          Object.keys(args).forEach((argKey) => {
              console.log("ArgKey ", argKey)
            if (typeof args[argKey] === 'number' || typeof args[argKey] === 'string') {
              dbQuery = dbQuery.eq(argKey, args[argKey]);
            }
      
            if (typeof args[argKey] === 'object') {
              const op = args[argKey];
              Object.keys(op).forEach((opKey) => {
                  dbQuery = dbQuery[opKey](argKey, op[opKey])
                  
              });
            }
          });
        }
      
        return await dbQuery;
    }
}

    async postWithDocumentNode(query: DocumentNode) {
        const jsonData = parseQuery(query)
        const selection = jsonData.definitions[0]?.selections[0]
        if(selection) {
            const items = selection.arguments?.map((arg: { value: any; name: any; values: any; fields: any; })=>{
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

    supabase

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
                query = () => query().filter()
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
    async readQuery(name: string, options?: any) {
        return await this.supabase.rpc(name, {
        table_name: options.tableName,
        ids: options.ids,
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


    async readWithQueryType(args: QueryType) {
        let query: any
        query = this.supabase.from(args.name).select()
        if(args.columns) {
            query = this.supabase.from(args.name).select(args.columns.join())
        }
        if(args.filter) {
            args.filter.forEach((filter: { op: string | number; args: any; }) => {
                query = query[filter.op](...filter.args)              
            });
        }
        return await query
    }
    async postWithQueryType(args: QueryType) {
        let query: any
        query = this.supabase.from(args.name).insert(args.data)
        return await query
    }
    /*async readItms(args: QueryType) {
        let query = this.supabase.from(args.name).select();
    
        if (args.columns) {
            query = query.select(args.columns.join());
        }
    
        if (args.filter) {
            args.filter.forEach(filter => {
                if (filter.op === 'eq') {
                    query = query.eq('age', 20);
                }
                // Add other filter operations as needed
            });
        }
    
        return await query;
    }*/
    
    async get(query: QueryType | DocumentNode) {
        if(isDocumentNode(query)) {
            return await this.readItemsWithDocumentNode(query)
        }
        else return await this.readWithQueryType
    }
    async post(query: QueryType | DocumentNode) {
        if(isDocumentNode(query)) {
            return await this.postWithDocumentNode(query)
        }
        else return await this.postWithQueryType(query)
    }
}



async function get(query: DocumentNode, config: any, options: any) {
    let supabase = createClient(config.url, config.key, options);
    const jsonData = parseQuery(query)
    const selection = jsonData.definitions[0].selections[0]
    
    const selections = selection.selections?.map((selected)=>{
        return selected.name
    })

    const args = selection.arguments

    let dbQuery: Function

    if (selections) {
        dbQuery = ()=> supabase.from(selection?.name).select(selections.join())
    }
    else {
        dbQuery = () => supabase.from(selection?.name).select();
    }

    if (args) {
        Object.keys(args).forEach(argKey => {
            if(typeof args[argKey] === 'number' || typeof args[argKey] === 'string') {
                dbQuery = ()=> dbQuery().eq(args[argKey])
            }

            if(typeof args[argKey] === 'object') {
                const op = args[argKey]
                Object.keys(op).forEach(opKey => {
                    //this.supabase.from('').select().gte()
                    /*switch (opKey) {
                        case "gt":
                            this.supabase.from(selection?.name).select().gt(argKey, op[opKey])
                            break;
                    
                        default:
                            break;
                    }*/
                    let opu = 'gt'
                    dbQuery = dbQuery()[opu](argKey, op[opKey])
                });
            }

            /*if (argKey === 'filter') {
                const filterOp = selection.arguments[argKey]

                Object.keys(filterOp).forEach(op => {
                    dbQuery = ()=> dbQuery()[op]
                })
            }
            if(Array(selection.arguments[argKey])) {
                selection.arguments[argKey].forEach((arg: any) => {
                    dbQuery = ()=> dbQuery().eq(argKey, arg)
                });
            }
            else if(typeof selection.arguments[argKey] === 'object') {
                args.fields.forEach(field => {
                    dbQuery = ()=> dbQuery().eq(args.name, args.fields)
                });
            }*/
        });
    }

    return await dbQuery()
}