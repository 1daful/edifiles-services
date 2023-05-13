import { IRepository } from "./IRepository";
import { Repository } from "./Repository";
//import { SupabaseRepo } from "./SupabaseRepo";
//import { FIRepository } from "./FIRepository";

export class Metadata{
    /*constructor() {
        this.repository = new FIRepository(db);
    }*/
    repository: IRepository = new Repository("metadata");
    //message!: string;

    async saveGenres(items: Record<string, any>[]) {
        let mediaItems = [] 
        for (const item of items) {
            if (item.genre) {
                await this.repository.addItems([{id: item.genre}]);
            }
            if (item.tags.length > 0){
                for (const tag of item.tags)
                mediaItems.push({id: tag})
            }
        }
        await this.repository.addItems(mediaItems)
    }

    async loadGenres() {
        return await this.repository.readItems();
    }

}