"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdiStorage = void 0;
const SupabaseStore_1 = require("./SupabaseStore");
class EdiStorage {
    storage = new SupabaseStore_1.SupabaseStore();
    upload(collName, path, file) {
        this.storage.upload(collName, path, file);
    }
    download(collName, path) {
        this.storage.download(collName, path);
    }
}
exports.EdiStorage = EdiStorage;
//# sourceMappingURL=storage.js.map