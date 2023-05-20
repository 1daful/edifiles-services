import { MeiliSearch } from 'meilisearch'
import { DateTime } from "luxon";
import config from "../../utility/config.json";
//import movies from '../small_movies.json'

export class Meilisearch {
  configHost = config.api.Meilisearch.host
  client
  constructor(host?: string) {
    this.client = new MeiliSearch({ host: host || this.configHost })
    /*if(DateTime.now().setZone('America/New_York') === DateTime.now().setZone('America/New_York').startOf('day')){
      this.client.index(collName).addDocuments(items)
      .then((res) => console.log(res))
    }*/
  }

  test(collName: string) {
    this.client.index(collName).getTask(0)
  }

  async search(collName: string, query: string) {
    return await this.client.index(collName).search(query)
  }

  index(collName: string, items: Record<string, any>[]) {
    this.client.index(collName).addDocuments(items)
      .then((res) => console.log("meilisearch", res))
  }

}
