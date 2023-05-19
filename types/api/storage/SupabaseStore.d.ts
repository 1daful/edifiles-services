import { IEdiStorage } from './IEdiStorage';
export declare class SupabaseStore implements IEdiStorage {
    supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
    create(path: string): Promise<{
        data: Pick<import("@supabase/storage-js").Bucket, "name"> | null;
        error: import("@supabase/storage-js").StorageError | null;
    }>;
    getUrl(collName: string, path: string): Promise<{
        data: {
            publicUrl: string;
        };
    }>;
    upload(collName: string, path: string, file: File): Promise<any>;
    download(collName: string, path: string): Promise<{
        data: Blob | null;
        error: import("@supabase/storage-js").StorageError | null;
    }>;
    getThumbnail(bucket: string, name: string): Promise<any>;
    getFile(url: string): Promise<() => Promise<Blob>>;
}
