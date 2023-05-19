import { SupabaseStore } from "./SupabaseStore";
export declare class EdiStorage {
    storage: SupabaseStore;
    upload(collName: string, path: string, file: any): void;
    download(collName: string, path: string): void;
}
