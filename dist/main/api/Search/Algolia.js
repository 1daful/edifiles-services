"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algolia = void 0;
const algoliasearch_1 = __importDefault(require("algoliasearch"));
const config_json_1 = __importDefault(require("../../../public/config.json"));
class Algolia {
    indexes = {};
    client = (0, algoliasearch_1.default)(config_json_1.default.api.Algolia.id, config_json_1.default.api.Algolia.key);
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
    async search(type, keywords) {
        const index = this.client.initIndex(String(type));
        return await index.search(keywords);
    }
}
exports.Algolia = Algolia;
//# sourceMappingURL=Algolia.js.map