import { Feedback, DateTime } from 'gorsejs/src/interfaces';
import { Gorse } from "gorsejs/src";
import config from "../../utility/config.json"

export class Recommender {
    /*bookMedia: IMedia = new BookMedia("books");
    quoteMedia: IMedia = new QuoteMedia("quotes");
    musicMedia: IMedia = new MusicMedia("music");
    videoMedia: IMedia = new VideoMedia("videos");*/
    //media: Media = new Media("collections")

    //client: IRepository = new Repository("Books");
    
    client = new Gorse({
        endpoint: config.api.Gorse.id,
        secret: config.api.Gorse.key,
      });

      /*client = new Axiosi()
      baseUrl = config.api.Regommend.baseUrl*/
 
    /*async indexItems(mediaList: Record<string, any>[], type: MediaRes) {
            //mediaList = mediaItems
            const search = new Search()
            console.log("mediaList: ", mediaList)
            let mediaIt: MediaType[] = mediaList)/
            /*if(mediaList){
                    for (let index = 0; index < 10 && index < mediaList.length; index++) {
                    const media = mediaList[index]?.doc;
                    media.objectID = media.id
                    
                    mediaIt.push(media)
                }
            }*/
            /*mediaList.forEach(media => {
            });*/
            //let meiliSearch = new Meilisearch("http://localhost:7700")

            /*if(mediaIt) await search.index(type, mediaIt)
        //NetworkLocal.test('Search indexed: ', mediaIt, "Search indexed")
    }*/

    /*private async load(type: MediaRes, params?: string[], op?: Record< string, any>) {
        //for (const item of mediaList) {
        let items
        let media
            switch (String(type)) {
                case 'quotes':
                    media = new Media("quotes")
                    items = await media.readItems("quotes", params, op);
                    NetworkLocal.test("mediaItems: ", items, "media")
                    return items
                    //break;

                case 'books':
                    media = new Media("books")
                    items = await media.readItems("books", params, op);
                    NetworkLocal.test("mediaItems: ", items, "media")
                    return items
                    //break;

                /*case 'music':
                    item.mediaItems = this.musicMedia.readMedia(params, op);
                    break;

                case 'video':
                    item.mediaItems = this.videoMedia.readMedia(params, op);
                    break;
                default:
                    break;
            }
            return items
    }*/

    /*async getMedia(type?: any, params= {keyword: "gospel"}) {
        //new VideoMedia().getMedia()
        //new MusicMedia().getMedia()
        //new BookMedia("books").getMedia()
        //new QuoteMedia("quotes").getMedia()
        const media = new Media("collections")
        await media.fetch(type, params)
    }*/

    async getRecommended(userId: string, category?: string) {
        const params = {
            userId,
            category
        }
        return await this.client.getRecommend(params)
        //return await this.client.load(this.baseUrl + "/recommends", params)
    }

    async getPopular(category?: string) {
        const params = {
            category
        }
        return await this.client.getPopular(params)
        /*this.client = new Repository("Books")
        const books = this.client.readItems()
        return this.client.readItems("Quotes")*/
    }

    async getLatest(category?: string) {
        const params = {
            category
        }
        //return await this.load(category)
        return await this.client.getLatest(params)
    }

    async getRelated(itemId: string, category?: string) {
        const params = {
            itemId,
            category
        } 
        return await this.client.getItemNeighbors(params)
    }

    async insertFeedback(/*itemId: string, category: string, userId: string, score: number*/userId: string, feedbackType: string, itemId: string, timestamp: DateTime) {
        /*const feedback = {
            score: score,
            itemId: itemId,
            category: category,
            userId: userId
        }*/
        const feedback: Feedback<string> = {
            UserId: userId,
            //UserId: "002",
            FeedbackType: feedbackType,
            ItemId: itemId,
            Timestamp: timestamp
        }
        const feedbacks: Feedback<string>[] = [feedback]
        //await this.client.insertUser({UserId: userId})
        //await this.client.insertUser({UserId: "002"})
        await this.client.insertFeedbacks(feedbacks)
        //return await this.client.postTo(config.api.Regommend.baseUrl + "/feedback", null, feedback)
    }

    async insertUser(id: string) {
        const user = {
            UserId: id,
        }
        await this.client.insertUser(user)
    }

    async insertItem(itemId: string, category: string) {
        await this.client.insertItemCategory(itemId, category)
    }
}
