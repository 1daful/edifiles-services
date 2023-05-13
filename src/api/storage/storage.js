import { SupabaseStore } from "./SupabaseStore";
export class EdiStorage {
    constructor() {
        this.storage = new SupabaseStore();
    }
    upload(collName, path, file) {
        this.storage.upload(collName, path, file);
    }
    download(collName, path) {
        this.storage.download(collName, path);
    }
}
