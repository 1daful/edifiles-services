import { MeiliSearch } from 'meilisearch';
//import movies from '../small_movies.json'
export class Meilisearch {
    client;
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
    async search(collName, query) {
        return await this.client.index(collName).search(query);
    }
    index(collName, items) {
        this.client.index(collName).addDocuments(items)
            .then((res) => console.log("meilisearch", res));
    }
}
