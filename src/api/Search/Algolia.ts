import { MediaRes } from 'src/Types.js';
import { MediaType } from 'src/Types.js';
import algoliasearch, { AlgoliaSearchOptions } from "algoliasearch";
import config from "../../../public/config.json";

export class Algolia {
    indexes: Record<string, any> = {}
    client = algoliasearch(config.api.Algolia.id, config.api.Algolia.key)
    index(type: MediaRes, items: MediaType[]) {
        const index = this.client.initIndex(String(type))
        const it = items[0]
        index.setSettings({
            searchableAttributes: Object.keys(it)
          }).then(() => {
            // done
          });
        const indexes = {
            [String(type)]: index.saveObjects(items, {
                autoGenerateObjectIDIfNotExist: true
              })
        }
        Object.assign(this.indexes, indexes)
    }

    async search(type: MediaRes, keywords: string) {
        const index = this.client.initIndex(String(type))
        return await index.search(keywords)
    }
}