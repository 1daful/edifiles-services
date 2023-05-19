import { createClient } from '@supabase/supabase-js';
import config from '../../public/config.json';
export class SupabaseStore {
    supabase = createClient(config.api.Supabase.url, config.api.Supabase.key);
    async create(path) {
        const { data, error } = await this.supabase.storage.createBucket(path);
        return { data, error };
    }
    async getUrl(collName, path) {
        return await this.supabase.storage.from(collName).getPublicUrl(path);
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
    async getThumbnail(bucket, name) {
        //const url = 'public/' + name + 'jpg'
        return await this.supabase.storage.from(bucket).getPublicUrl(name).publicURL; // path to the image in the bucket 
    }
    async getFile(url) {
        let response = await fetch(url);
        let file = await response.blob;
        return file;
    }
}
