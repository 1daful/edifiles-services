var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Search } from './Search/Search';
import { NetworkLocal } from './network';
import { Media } from "../media/Media";
import { Gorse } from "../gorsejs/src";
import config from "../../public/config.json";
/*import { Repository } from '../model/Repository';
import { IRepository } from '../model/IRepository';*/
export class Recommender {
    constructor() {
        /*bookMedia: IMedia = new BookMedia("books");
        quoteMedia: IMedia = new QuoteMedia("quotes");
        musicMedia: IMedia = new MusicMedia("music");
        videoMedia: IMedia = new VideoMedia("videos");*/
        //media: Media = new Media("collections")
        //client: IRepository = new Repository("Books");
        this.client = new Gorse({
            endpoint: config.api.Gorse.id,
            secret: config.api.Gorse.key,
        });
    }
    /*client = new Axiosi()
    baseUrl = config.api.Regommend.baseUrl*/
    readMedia(section, type, category, id, op) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let mediaList = yield this.load(type, undefined, op);
            //if(mediaList) this.indexItems(mediaList, type)
            NetworkLocal.test('mediaListRecomm: ', mediaList, "Recomm");
            return mediaList;
        });
    }
    indexItems(mediaList, type) {
        return __awaiter(this, void 0, void 0, function* () {
            //mediaList = mediaItems
            const search = new Search();
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
                yield search.index(type, mediaIt);
            NetworkLocal.test('Search indexed: ', mediaIt, "Search indexed");
        });
    }
    load(type, params, op) {
        return __awaiter(this, void 0, void 0, function* () {
            //for (const item of mediaList) {
            let items;
            let media;
            switch (String(type)) {
                case 'quotes':
                    media = new Media("quotes");
                    items = yield media.readItems("quotes", params, op);
                    NetworkLocal.test("mediaItems: ", items, "media");
                    return items;
                //break;
                case 'books':
                    media = new Media("books");
                    items = yield media.readItems("books", params, op);
                    NetworkLocal.test("mediaItems: ", items, "media");
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
        });
    }
    getMedia(type, params = { keyword: "gospel" }) {
        return __awaiter(this, void 0, void 0, function* () {
            //new VideoMedia().getMedia()
            //new MusicMedia().getMedia()
            //new BookMedia("books").getMedia()
            //new QuoteMedia("quotes").getMedia()
            const media = new Media("collections");
            yield media.fetch(type, params);
        });
    }
    getRecommended(userId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                userId,
                category
            };
            return yield this.client.getRecommend(params);
            //return await this.client.load(this.baseUrl + "/recommends", params)
        });
    }
    getPopular(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                category
            };
            return yield this.client.getPopular(params);
            /*this.client = new Repository("Books")
            const books = this.client.readItems()
            return this.client.readItems("Quotes")*/
        });
    }
    getLatest(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                category
            };
            //return await this.load(category)
            return yield this.client.getLatest(params);
        });
    }
    getRelated(itemId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                itemId,
                category
            };
            return yield this.client.getItemNeighbors(params);
        });
    }
    insertFeedback(/*itemId: string, category: string, userId: string, score: number*/ userId, feedbackType, itemId, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.client.insertFeedbacks(feedbacks);
            //return await this.client.postTo(config.api.Regommend.baseUrl + "/feedback", null, feedback)
        });
    }
    insertUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                UserId: id,
            };
            yield this.client.insertUser(user);
        });
    }
    insertItem(itemId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.insertItemCategory(itemId, category);
        });
    }
}
