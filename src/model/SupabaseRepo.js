var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from "../../public/config.json";
import { createClient } from "@supabase/supabase-js";
export class SupabaseRepo {
    constructor() {
        this.options = {
            schema: 'public',
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        };
        this.supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, this.options);
    }
    search(field, query, collName) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            const { data, error } = yield this.supabase
                .from(collName)
                .select()
                .textSearch(field, `'${query}'`);
            return { data, error };
        });
    }
    addItem(collName, items) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supabase
                .from(collName)
                .insert(items);
        });
    }
    addItems(collName, items) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supabase
                .from(collName)
                .insert(items);
        });
    }
    readItem(collName, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase
                //.from(collName)
                //.select(*).eq(field, value)
                .from(collName)
                .select().eq('id', value);
            return data;
        });
    }
    readItems(collName, params, param, val, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params !== undefined && val) {
                const { data, error } = yield this.supabase
                    .from(collName)
                    .select(`${params.key}, ${params.fColl}(${params.fKey1})`)
                    //.eq(`${params.fColl}.${params.fKey2}`, val)
                    .eq(params.fKey2, val)
                    .limit(limit);
                return data;
            }
            if (param && val) {
                const { data, error } = yield this.supabase
                    .from(collName)
                    .select(`${param.key}`)
                    //.eq(`${params.fColl}.${params.fKey2}`, val)
                    .eq(param.fKey, val)
                    .limit(limit);
                return data;
            }
            const { data, error } = yield this.supabase
                .from(collName)
                .select()
                .limit(limit);
            return data;
        });
    }
    updateItem(newItem, oldItem, collName) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase
                .from(collName)
                .update(newItem)
                .match(oldItem);
        });
    }
    deleteItem(collName, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase
                .from(collName)
                .delete()
                .match(item);
        });
    }
    find(op, collName, _sort, _limit) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.keys(op).forEach((key) => __awaiter(this, void 0, void 0, function* () {
                let i = 0;
                const { data, error } = yield this.supabase
                    .from(collName)
                    .select()
                    .textSearch(key, `'${op[key]}'`);
                return { data, error };
            }));
        });
    }
}
