"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meilisearch = void 0;
const meilisearch_1 = require("meilisearch");
const config_json_1 = __importDefault(require("../../utility/config.json"));
//import movies from '../small_movies.json'
class Meilisearch {
    configHost = config_json_1.default.api.Meilisearch.host;
    client;
    constructor(host) {
        this.client = new meilisearch_1.MeiliSearch({ host: host || this.configHost });
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