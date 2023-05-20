"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meilisearch = void 0;
const meilisearch_1 = require("meilisearch");
//import movies from '../small_movies.json'
class Meilisearch {
    client;
    constructor(host) {
        this.client = new meilisearch_1.MeiliSearch({ host: host });
        /*if(DateTime.now().setZone('America/New_York') === DateTime.now().setZone('America/New_York').startOf('day')){
          this.client.index(collName).addDocuments(items)
          .then((res) => console.log(res))
        }*/
    }
    test(collName) {
        this.client.index(collName).getTask(0);
    }
    async search(collName, query) {
        return await this.client.index(collName).search(query);
    }
    index(collName, items) {
        this.client.index(collName).addDocuments(items)
            .then((res) => console.log("meilisearch", res));
    }
}
exports.Meilisearch = Meilisearch;
//# sourceMappingURL=meilisearch.js.map