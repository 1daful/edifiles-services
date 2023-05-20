"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recommender = void 0;
const Search_1 = require("./../Search/Search");
const network_1 = require("../network");
const Media_1 = require("../../media/Media");
const src_1 = require("gorsejs/src");
const config_json_1 = __importDefault(require("../../utility/config.json"));
/*import { Repository } from '../model/Repository';
import { IRepository } from '../model/IRepository';*/
class Recommender {
    /*bookMedia: IMedia = new BookMedia("books");
    quoteMedia: IMedia = new QuoteMedia("quotes");
    musicMedia: IMedia = new MusicMedia("music");
    videoMedia: IMedia = new VideoMedia("videos");*/
    //media: Media = new Media("collections")
    //client: IRepository = new Repository("Books");
    client = new src_1.Gorse({
        endpoint: config_json_1.default.api.Gorse.id,
        secret: config_json_1.default.api.Gorse.key,
    });
    /*client = new Axiosi()
    baseUrl = config.api.Regommend.baseUrl*/
    async readMedia(section, type, category, id, op) {
        //let params;
        //let op;
        //let collMedia =[]
        /*switch (section) {
            case 'related':
                if (!genre) {
                    console.error('genre is not provided')
                    break;
                }*/
        /*params = {
            fieldPath: 'genre',
            op: '=',
            value: `${genre}`
        };*/
        /*if (genre) {
            params = ['genre'];
            op = {
                [genre]: "$eq"
            }
            mediaList = await this.load(type, params, op);
            return mediaList
        }*/
        //break;
        //case 'sameAuthor':
        /*if (!item) {break;}
        params = {
            fieldPath: 'author',
            op: '=',
            value: `${item.author}`
        }*/
        /*if (author) {
            params = ['author'];
        op = {
            [author]: "$eq"
        }
        mediaList = await this.load(type, params, op);
        return mediaList
    }*/
        /* switch (section) {
             case "recommended":
                 if (id) mediaItems =  this.getRecommended(id)
                 break;
             case "latest":
                 mediaItems = this.getLatest(category)
                 break;
         
             case "popular":
                 mediaItems = this.getPopular(category)
                 break;
 
             case "related":
                 if (id) mediaItems = this.getRelated(id, category)
                 break;
             default:
                 break;
         }*/
        /*break;
    case 'top':
        await this.load(mediaList);
        break;
    case 'collection':
         y = await this.media.readItems();
         mediaList[4].mediaItems = y as never[]
        break
    default:
        break;*/
        let mediaList = await this.load(type, undefined, op);
        //if(mediaList) this.indexItems(mediaList, type)
        network_1.NetworkLocal.test('mediaListRecomm: ', mediaList, "Recomm");
        return mediaList;
    }
    async indexItems(mediaList, type) {
        //mediaList = mediaItems
        const search = new Search_1.Search();
        console.log("mediaList: ", mediaList);
        let mediaIt = mediaList;
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
        if (mediaIt)
            await search.index(type, mediaIt);
        network_1.NetworkLocal.test('Search indexed: ', mediaIt, "Search indexed");
    }
    async load(type, params, op) {
        //for (const item of mediaList) {
        let items;
        let media;
        switch (String(type)) {
            case 'quotes':
                media = new Media_1.Media("quotes");
                items = await media.readItems("quotes", params, op);
                network_1.NetworkLocal.test("mediaItems: ", items, "media");
                return items;
            //break;
            case 'books':
                media = new Media_1.Media("books");
                items = await media.readItems("books", params, op);
                network_1.NetworkLocal.test("mediaItems: ", items, "media");
                return items;
            //break;
            /*case 'music':
                item.mediaItems = this.musicMedia.readMedia(params, op);
                break;

            case 'video':
                item.mediaItems = this.videoMedia.readMedia(params, op);
                break;*/
            default:
                break;
        }
        return items;
    }
    async getMedia(type, params = { keyword: "gospel" }) {
        //new VideoMedia().getMedia()
        //new MusicMedia().getMedia()
        //new BookMedia("books").getMedia()
        //new QuoteMedia("quotes").getMedia()
        const media = new Media_1.Media("collections");
        await media.fetch(type, params);
    }
    async getRecommended(userId, category) {
        const params = {
            userId,
            category
        };
        return await this.client.getRecommend(params);
        //return await this.client.load(this.baseUrl + "/recommends", params)
    }
    async getPopular(category) {
        const params = {
            category
        };
        return await this.client.getPopular(params);
        /*this.client = new Repository("Books")
        const books = this.client.readItems()
        return this.client.readItems("Quotes")*/
    }
    async getLatest(category) {
        const params = {
            category
        };
        //return await this.load(category)
        return await this.client.getLatest(params);
    }
    async getRelated(itemId, category) {
        const params = {
            itemId,
            category
        };
        return await this.client.getItemNeighbors(params);
    }
    async insertFeedback(/*itemId: string, category: string, userId: string, score: number*/ userId, feedbackType, itemId, timestamp) {
        /*const feedback = {
            score: score,
            itemId: itemId,
            category: category,
            userId: userId
        }*/
        const feedback = {
            UserId: userId,
            //UserId: "002",
            FeedbackType: feedbackType,
            ItemId: itemId,
            Timestamp: timestamp
        };
        const feedbacks = [feedback];
        //await this.client.insertUser({UserId: userId})
        //await this.client.insertUser({UserId: "002"})
        await this.client.insertFeedbacks(feedbacks);
        //return await this.client.postTo(config.api.Regommend.baseUrl + "/feedback", null, feedback)
    }
    async insertUser(id) {
        const user = {
            UserId: id,
        };
        await this.client.insertUser(user);
    }
    async insertItem(itemId, category) {
        await this.client.insertItemCategory(itemId, category);
    }
}
exports.Recommender = Recommender;
//# sourceMappingURL=Recommender.js.map