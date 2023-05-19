var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Repository } from '../model/Repository';
import { QuoteMedia } from './QuoteMedia';
import { NetworkLocal } from './../api/network';
import { MediaApi } from "../api/MediaApi.js";
//import { IRepository } from "../model/IRepository.js";
//import { SupabaseRepo } from "../model/SupabaseRepo";
import { EdiStorage } from "src/api/storage.js";
//import { Pexels } from "src/api/pic/Pexels.js";
//import { IMediaApi } from "src/api/IMediaApi.js";
import { ApiFormat } from "src/apiReqFormat/ApiFormat.js";
import { Axiosi } from "../api/Axiosi";
import { Unsplash } from "../api/pic/ImageGen";
import { BookMedia } from './BookMedia';
import { VideoMedia } from './VideoMedia';
import { MusicMedia } from './MusicMedia';
import { Metadata } from '../model/metadata';
//import { Typesense } from "src/typesense.js";
//import { NetworkLocal } from "@/api/network.js";
/**
 * Class Media acts as delegates for the media class instances' functions.
 * @function load
 * @function createApi
 */
export class Media {
    constructor(type) {
        this.metadata = new Metadata();
        this.store = new EdiStorage();
        this.imageGen = new Unsplash({ keyword: "christian and gospel", length: "10" });
        //search = new Typesense()
        //genre: string = '';
        this.client = new Axiosi();
        this.repository = new Repository(type);
    }
    /**
     * Used to delegate a media class method to get mediaItems from its registered media APIs, and the save them in the repository for peristence.
     * @param type
     * @param media
     * @param params
     */
    fetch(type, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let media;
            //this.load(new QuoteMedia(params), "quotes")
            if (type) {
                switch (type) {
                    case "quotes":
                        media = new QuoteMedia(params);
                        return yield this.load(media, type);
                    case "books":
                        media = new BookMedia(params);
                        return yield this.load(media, type);
                    case "videos":
                        media = new VideoMedia(params);
                        return yield this.load(media, type);
                    case "music":
                        media = new MusicMedia(params);
                        return yield this.load(media, type);
                    default:
                        break;
                }
            }
            else {
                yield this.load(new QuoteMedia(params), "quotes");
                yield this.load(new BookMedia(params), "books");
                /*let mediaList = []
                mediaList.push(this.load(new QuoteMedia(params), "quotes"))
                mediaList.push(this.load(new BookMedia(params), "books"))
                mediaList.push(this.load(new VideoMedia(params), "videos"))
                mediaList.push(this.load(new MusicMedia(params), "music"))
                return mediaList*/
                /*this.load(new QuoteMedia(params), "quotes")
                this.load(new BookMedia(params), "books")
                this.load(new VideoMedia(params), "videos")
                this.load(new MusicMedia(params), "music")*/
            }
        });
    }
    load(media, type) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            //const mediaItems: Record<string, any>[] = [];
            //const result: Record<string, any> = {}
            try {
                for (const api of media.apis) {
                    let mediaApi = new MediaApi(api);
                    //mediaItems.push(mediaApi.getItems(type, params));
                    //const name = mediaApi.api.constructor.name
                    //NetworkLocal.test(`${name} good!`)
                    const items = yield mediaApi.getItems(type);
                    //const images = await this.getImage(mediaApi, "christians")
                    if (items && type == "quotes") {
                        //NetworkLocal.test(`This is item from Media load. ${items}`)
                        //this.repository.changeDB('supabase')
                        const images = yield this.getImage();
                        if (Array.isArray(images)) {
                            for (let index = 0; index < 10; index++) {
                                const item = items[index];
                                item.thumbnailsmall = (_a = images[index]) === null || _a === void 0 ? void 0 : _a.thumbnailSmall;
                                item.thumbnaillarge = (_b = images[index]) === null || _b === void 0 ? void 0 : _b.thumbnailLarge;
                                //NetworkLocal.test("item in media", images, "images")
                                //NetworkLocal.test("item in media", item, "images")
                            }
                        }
                        /*items.forEach(async item => {
                            console.log("item description", item.description)
                          //let i = 0
                          //item.thumbnailSmall = images[i].src.original
                          const image = await this.getImage(this.url, item.description)
                          item.thumbnailSmall = image.urls.regular
                          item.thumbnailLarge = image.urls.regular
                        });*/
                        //this.search.import()
                    }
                    yield this.addItems(items, type);
                    yield this.metadata.saveGenres(items);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * Delegate method for a media class to register it's API objects
     * @param media
     * @param api
     */
    /*createApi(media: IMedia, ...api: IMediaApi[]) {
        media.apis.push(...api);
    }*/
    addItems(items, collName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            if (collName) {
                const repository = new Repository(collName);
                yield repository.addItems(items);
                return result;
            }
            try {
                //NetworkLocal.test("Adding items from Media")
                yield this.repository.addItems(items);
            }
            catch (err) {
                console.log(err);
            }
            //console.log("Unable to load media")
            return result;
        });
    }
    readItems(collName, params, op, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let results;
            if (collName) {
                const repository = new Repository(collName);
                results = yield this.repository.readItems(collName, params, op, limit);
                NetworkLocal.test("result: ", results);
                return results;
            }
            try {
                results = yield this.repository.readItems(collName, params, op);
                /*for (const result of results) {
                    const res = await this.repository.readItem(result._id)
                    result.push(res)
                }*/
                NetworkLocal.test("result: ", results);
                return results;
            }
            catch (err) {
                console.log(err);
                console.log("Unable to load media");
            }
        });
    }
    getImage() {
        return __awaiter(this, void 0, void 0, function* () {
            const format = new ApiFormat({
            //item.description
            //keyword: query
            });
            //mediaApi = new MediaApi(new Pexels(new ApiFormat(format)))
            //const images = await mediaApi.getItems('images')
            // const pexels = new Pexels({})
            //const images = await pexels.getPhotos('e')
            const images = yield this.client.get(this.imageGen.imageRes);
            return images;
            //this.store.upload()
        });
    }
    getThumbnail(name, collName) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new Repository(collName);
            let data = yield repository.search("name", name);
            return data.thumbnail;
        });
    }
}
