"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdiStorage = void 0;
const SupabaseStore_1 = require("./SupabaseStore");
class EdiStorage {
    storage = new SupabaseStore_1.SupabaseStore();
    async create(path) {
        return await this.storage.create(path);
    }
    async getUrl(bucket, name) {
        return await this.storage.getUrl(bucket, name);
    }
    async getFile(url) {
        return await this.storage.getFile(url);
    }
    async upload(collName, path, file) {
        return await this.storage.upload(collName, path, file);
    }
    async download(collName, path) {
        return await this.storage.download(collName, path);
    }
}
exports.EdiStorage = EdiStorage;
//# sourceMappingURL=storage.js.map