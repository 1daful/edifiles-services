"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseRepo = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const Query_1 = require("../utility/Query");
class SupabaseRepo {
    constructor(config) {
        this.supabase = (0, supabase_js_1.createClient)(config.url, config.key, this.options);
    }
    async get(query) {
        if (typeof query === 'string') {
            let dbQuery = this.supabase.from(query).select();
            return await dbQuery;
        }
        else {
            const jsonData = (0, Query_1.parseQuery)(query);
            const selection = jsonData.definitions[0].selections[0];
            const selections = selection.selections?.map((selected) => selected.name);
            const args = selection.arguments;
            let dbQuery = this.supabase.from(selection?.name).select();
            if (selections) {
                dbQuery = this.supabase.from(selection?.name).select(selections.join());
            }
            if (args) {
                Object.keys(args).forEach((argKey) => {
                    console.log("ArgKey ", argKey);
                    if (typeof args[argKey] === 'number' || typeof args[argKey] === 'string') {
                        dbQuery = dbQuery.eq(argKey, args[argKey]);
                    }
                    if (typeof args[argKey] === 'object') {
                        const op = args[argKey];
                        Object.keys(op).forEach((opKey) => {
                            dbQuery = dbQuery[opKey](argKey, op[opKey]);
                        });
                    }
                });
            }
            return await dbQuery;
        }
    }
    async post(query) {
        const jsonData = (0, Query_1.parseQuery)(query);
        const selection = jsonData.definitions[0]?.selections[0];
        if (selection) {
            const items = selection.arguments?.map((arg) => {
                if (arg.value) {
                    return { [arg.name]: arg.value };
                }
                if (arg.values) {
                    return { [arg.name]: arg.values };
                }
                if (arg.fields) {
                    return { [arg.name]: arg.fields };
                }
            });
            return await this.supabase
                .from(selection?.name)
                .insert(items);
        }
    }
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
    supabase;
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
        return await this.supabase
            //.from(collName)
            //.select(*).eq(field, value)
            .from(collName)
            .select().eq(field, value);
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
        return await query();
    }
    async readQuery(name, options) {
        return await this.supabase.rpc(name, {
            table_name: options.tableName,
            ids: options.ids,
        });
        // Process the data as needed
    }
    async updateItem(newItem, oldItem, collName) {
        return await this.supabase
            .from(collName)
            .update(newItem)
            .match(oldItem);
    }
    async deleteItem(collName, item) {
        return await this.supabase
            .from(collName)
            .delete()
            .match(item);
    }
    async find(op, collName, _sort, _limit) {
        Object.keys(op).forEach(async (key) => {
            let i = 0;
            return await this.supabase
                .from(collName)
                .select()
                .textSearch(key, `'${op[key]}'`);
        });
    }
}
exports.SupabaseRepo = SupabaseRepo;
async function get(query, config, options) {
    let supabase = (0, supabase_js_1.createClient)(config.url, config.key, options);
    const jsonData = (0, Query_1.parseQuery)(query);
    const selection = jsonData.definitions[0].selections[0];
    const selections = selection.selections?.map((selected) => {
        return selected.name;
    });
    const args = selection.arguments;
    let dbQuery;
    if (selections) {
        dbQuery = () => supabase.from(selection?.name).select(selections.join());
    }
    else {
        dbQuery = () => supabase.from(selection?.name).select();
    }
    if (args) {
        Object.keys(args).forEach(argKey => {
            if (typeof args[argKey] === 'number' || typeof args[argKey] === 'string') {
                dbQuery = () => dbQuery().eq(args[argKey]);
            }
            if (typeof args[argKey] === 'object') {
                const op = args[argKey];
                Object.keys(op).forEach(opKey => {
                    //this.supabase.from('').select().gte()
                    /*switch (opKey) {
                        case "gt":
                            this.supabase.from(selection?.name).select().gt(argKey, op[opKey])
                            break;
                    
                        default:
                            break;
                    }*/
                    let opu = 'gt';
                    dbQuery = dbQuery()[opu](argKey, op[opKey]);
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
    return await dbQuery();
}
//# sourceMappingURL=SupabaseRepo.js.map