var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Repository } from "./Repository";
//import { SupabaseRepo } from "./SupabaseRepo";
//import { FIRepository } from "./FIRepository";
export class Metadata {
    constructor() {
        /*constructor() {
            this.repository = new FIRepository(db);
        }*/
        this.repository = new Repository("metadata");
    }
    //message!: string;
    saveGenres(items) {
        return __awaiter(this, void 0, void 0, function* () {
            let mediaItems = [];
            for (const item of items) {
                if (item.genre) {
                    yield this.repository.addItems([{ id: item.genre }]);
                }
                if (item.tags.length > 0) {
                    for (const tag of item.tags)
                        mediaItems.push({ id: tag });
                }
            }
            yield this.repository.addItems(mediaItems);
        });
    }
    loadGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.readItems();
        });
    }
}
