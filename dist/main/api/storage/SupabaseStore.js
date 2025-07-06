"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseStore = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
class SupabaseStore {
    constructor(config) {
        this.supabase = (0, supabase_js_1.createClient)(config.baseUrl, config.baseConfig.key);
    }
    supabase;
    async create(path) {
        const { data, error } = await this.supabase.storage.createBucket(path);
        return { data, error };
    }
    async createBucket(bucketName) {
        // Step 1: List all buckets
        const { data: buckets, error: listError } = await this.supabase.storage.listBuckets();
        if (listError) {
            console.error("Failed to list buckets:", listError);
            return;
        }
        // Step 2: Check if the bucket already exists
        const exists = buckets?.some(bucket => bucket.name === bucketName);
        if (exists) {
            console.log(`Bucket "${bucketName}" already exists.`);
            return;
        }
        // Step 3: Create the bucket if it does not exist
        const { data: createdBucket, error: createError } = await this.supabase.storage.createBucket(bucketName);
        if (createError) {
            console.error("Error creating bucket:", createError);
            return;
        }
        console.log(`Bucket "${bucketName}" created successfully:`, createdBucket);
    }
    async upload(bucket, path, file, options) {
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(path, file, options);
        return { data, error };
    }
    async download(bucket, path, options) {
        const { data, error } = await this.supabase.storage.from(bucket).download(path, options);
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
    async addFiles(files, bucket = 'avatars') {
        const file = files[0];
        if (!file)
            return;
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await this.upload(bucket, fileName, file, {
            cacheControl: '3600',
            upsert: true,
        });
        if (error) {
            console.error('Upload error:', error.message);
            return;
        }
        return this.getUrl(bucket, fileName);
    }
    async downloadAndSaveFile(fileName, bucket = 'avatars') {
        const { data, error } = await this.download(bucket, fileName);
        if (error) {
            console.error("Error downloading file:", error);
            return;
        }
        // Create a blob URL for the downloaded data
        const blobUrl = URL.createObjectURL(data);
        // Create a temporary <a> to trigger download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName; // specify the file name for saving
        document.body.appendChild(link);
        link.click();
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    }
}
exports.SupabaseStore = SupabaseStore;
//# sourceMappingURL=SupabaseStore.js.map