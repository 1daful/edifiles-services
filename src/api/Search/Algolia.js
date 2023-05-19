var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import algoliasearch from "algoliasearch";
import config from "../../../public/config.json";
export class Algolia {
    constructor() {
        this.indexes = {};
        this.client = algoliasearch(config.api.Algolia.id, config.api.Algolia.key);
    }
    index(type, items) {
        const index = this.client.initIndex(String(type));
        const it = items[0];
        index.setSettings({
            searchableAttributes: Object.keys(it)
        }).then(() => {
            // done
        });
        const indexes = {
            [String(type)]: index.saveObjects(items, {
                autoGenerateObjectIDIfNotExist: true
            })
        };
        Object.assign(this.indexes, indexes);
    }
    search(type, keywords) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.client.initIndex(String(type));
            return yield index.search(keywords);
        });
    }
}
