"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseStore = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const config_json_1 = __importDefault(require("../../utility/config.json"));
class SupabaseStore {
    supabase = (0, supabase_js_1.createClient)(config_json_1.default.api.Supabase.url, config_json_1.default.api.Supabase.key);
    async create(path) {
        const { data, error } = await this.supabase.storage.createBucket(path);
        return { data, error };
    }
    async upload(collName, path, file) {
        const { data, error } = await this.supabase.storage
            .from(collName)
            .upload(path, file);
        return { data, error };
    }
    async download(collName, path) {
        const { data, error } = await this.supabase.storage.from(collName).download(path);
        return { data, error };
    }
    async getUrl(bucket, name) {
        //const url = 'public/' + name + 'jpg'
        return await this.supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl; // path to the image in the bucket 
    }
    async getFile(url) {
        let response = await fetch(url);
        let file = await response.blob;
        return file;
    }
}
exports.SupabaseStore = SupabaseStore;
//# sourceMappingURL=SupabaseStore.js.map