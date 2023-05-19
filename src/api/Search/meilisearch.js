var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MeiliSearch } from 'meilisearch';
//import movies from '../small_movies.json'
export class Meilisearch {
    constructor(host) {
        this.client = new MeiliSearch({ host: host });
        /*if(DateTime.now().setZone('America/New_York') === DateTime.now().setZone('America/New_York').startOf('day')){
          this.client.index(collName).addDocuments(items)
          .then((res) => console.log(res))
        }*/
    }
    test(collName) {
        this.client.index(collName).getTask(0);
    }
    search(collName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.index(collName).search(query);
        });
    }
    index(collName, items) {
        this.client.index(collName).addDocuments(items)
            .then((res) => console.log("meilisearch", res));
    }
}
