"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
const Repository_1 = require("./Repository");
//import { SupabaseRepo } from "./SupabaseRepo";
//import { FIRepository } from "./FIRepository";
class Metadata {
    /*constructor() {
        this.repository = new FIRepository(db);
    }*/
    repository = new Repository_1.Repository("metadata");
    //message!: string;
    async saveGenres(items) {
        let mediaItems = [];
        for (const item of items) {
            if (item.genre) {
                await this.repository.addItems([{ id: item.genre }]);
            }
            if (item.tags.length > 0) {
                for (const tag of item.tags)
                    mediaItems.push({ id: tag });
            }
        }
        await this.repository.addItems(mediaItems);
    }
    async loadGenres() {
        return await this.repository.readItems();
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=metadata.js.map