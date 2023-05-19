import algoliasearch from "algoliasearch";
import config from "../../../public/config.json";
export class Algolia {
    indexes = {};
    client = algoliasearch(config.api.Algolia.id, config.api.Algolia.key);
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
