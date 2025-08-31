import { createClient } from "@supabase/supabase-js";
import { IClient } from "../clients/IClient";
import { ApiRequest, RequestQuery } from "../utility/Types";
import { IRepository } from "./IRepository";

export class SupabaseDb implements IClient {
    supabase: any;
     constructor(config: any) {
            this.supabase = createClient(config.url, config.key, this.options);
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
    async get(request: RequestQuery, options?: any) {
        let query: any
        query = this.supabase.from(request.url).select()
        if (options) {
            query = this.supabase.from(request.url).select("*", options)
        }
        if(request.params?.columns) {
            query = this.supabase.from(request.url).select(request.params.columns.join(), options)
        }
        /*if(args.filter) {
            args.filter.forEach((filter: { op: string | number; args: any; }) => {
                query = query[filter.op](...filter.args)             
            });
        }*/
        if(request.params?.filters) {
            request.params.filters.forEach((filter) => {
                query = query.filter(filter.col, filter.op, filter.val)         
            });
        }

        if(request.params?.modifiers) {
            request.params.modifiers.forEach((modifier) => {
                if (Array.isArray(modifier.val)) query = query[modifier.op](...modifier.val)
                else query = query[modifier.op]()   
            });
        }

        return await query
            
    }
    async post(request: ApiRequest, options?: any) {
        let query: any
        query = this.supabase.from(request.url).insert(request.data)
        return await query  
    }
    postWithTransaction?(request: ApiRequest, options?: any) {
        throw new Error("Method not implemented.");
    }

    rpc(name: string, params?: any) {
        return this.supabase.rpc(name, params);
    }

}