"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const Repository_1 = require("../model/Repository");
const QuoteMedia_1 = require("./QuoteMedia");
const network_1 = require("./../api/network");
const MediaApi_js_1 = require("../api/MediaApi.js");
//import { IRepository } from "../model/IRepository.js";
//import { SupabaseRepo } from "../model/SupabaseRepo";
const storage_js_1 = require("src/api/storage.js");
//import { Pexels } from "src/api/pic/Pexels.js";
//import { IMediaApi } from "src/api/IMediaApi.js";
const ApiFormat_js_1 = require("src/apiReqFormat/ApiFormat.js");
const Axiosi_1 = require("../api/Axiosi");
const ImageGen_1 = require("../api/pic/ImageGen");
const BookMedia_1 = require("./BookMedia");
const VideoMedia_1 = require("./VideoMedia");
const MusicMedia_1 = require("./MusicMedia");
const metadata_1 = require("../model/metadata");
//import { Typesense } from "src/typesense.js";
//import { NetworkLocal } from "@/api/network.js";
/**
 * Class Media acts as delegates for the media class instances' functions.
 * @function load
 * @function createApi
 */
class Media {
    constructor(type) {
        this.repository = new Repository_1.Repository(type);
    }
    repository;
    metadata = new metadata_1.Metadata();
    store = new storage_js_1.EdiStorage();
    imageGen = new ImageGen_1.Unsplash({ keyword: "christian and gospel", length: "10" });
    //search = new Typesense()
    //genre: string = '';
    client = new Axiosi_1.Axiosi();
    /**
     * Used to delegate a media class method to get mediaItems from its registered media APIs, and the save them in the repository for peristence.
     * @param type
     * @param media
     * @param params
     */
    async fetch(type, params) {
        let media;
        //this.load(new QuoteMedia(params), "quotes")
        if (type) {
            switch (type) {
                case "quotes":
                    media = new QuoteMedia_1.QuoteMedia(params);
                    return await this.load(media, type);
                case "books":
                    media = new BookMedia_1.BookMedia(params);
                    return await this.load(media, type);
                case "videos":
                    media = new VideoMedia_1.VideoMedia(params);
                    return await this.load(media, type);
                case "music":
                    media = new MusicMedia_1.MusicMedia(params);
                    return await this.load(media, type);
                default:
                    break;
            }
        }
        else {
            await this.load(new QuoteMedia_1.QuoteMedia(params), "quotes");
            await this.load(new BookMedia_1.BookMedia(params), "books");
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
    }
    async load(media, type) {
        //const mediaItems: Record<string, any>[] = [];
        //const result: Record<string, any> = {}
        try {
            for (const api of media.apis) {
                let mediaApi = new MediaApi_js_1.MediaApi(api);
                //mediaItems.push(mediaApi.getItems(type, params));
                //const name = mediaApi.api.constructor.name
                //NetworkLocal.test(`${name} good!`)
                const items = await mediaApi.getItems(type);
                //const images = await this.getImage(mediaApi, "christians")
                if (items && type == "quotes") {
                    //NetworkLocal.test(`This is item from Media load. ${items}`)
                    //this.repository.changeDB('supabase')
                    const images = await this.getImage();
                    if (Array.isArray(images)) {
                        for (let index = 0; index < 10; index++) {
                            const item = items[index];
                            item.thumbnailsmall = images[index]?.thumbnailSmall;
                            item.thumbnaillarge = images[index]?.thumbnailLarge;
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
                await this.addItems(items, type);
                await this.metadata.saveGenres(items);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     * Delegate method for a media class to register it's API objects
     * @param media
     * @param api
     */
    /*createApi(media: IMedia, ...api: IMediaApi[]) {
        media.apis.push(...api);
    }*/
    async addItems(items, collName) {
        const result = {};
        if (collName) {
            const repository = new Repository_1.Repository(collName);
            await repository.addItems(items);
            return result;
        }
        try {
            //NetworkLocal.test("Adding items from Media")
            await this.repository.addItems(items);
        }
        catch (err) {
            console.log(err);
        }
        //console.log("Unable to load media")
        return result;
    }
    async readItems(collName, params, op, limit) {
        let results;
        if (collName) {
            const repository = new Repository_1.Repository(collName);
            results = await this.repository.readItems(collName, params, op, limit);
            network_1.NetworkLocal.test("result: ", results);
            return results;
        }
        try {
            results = await this.repository.readItems(collName, params, op);
            /*for (const result of results) {
                const res = await this.repository.readItem(result._id)
                result.push(res)
            }*/
            network_1.NetworkLocal.test("result: ", results);
            return results;
        }
        catch (err) {
            console.log(err);
            console.log("Unable to load media");
        }
    }
    async getImage() {
        const format = new ApiFormat_js_1.ApiFormat({
        //item.description
        //keyword: query
        });
        //mediaApi = new MediaApi(new Pexels(new ApiFormat(format)))
        //const images = await mediaApi.getItems('images')
        // const pexels = new Pexels({})
        //const images = await pexels.getPhotos('e')
        const images = await this.client.get(this.imageGen.imageRes);
        return images;
        //this.store.upload()
    }
    async getThumbnail(name, collName) {
        const repository = new Repository_1.Repository(collName);
        let data = await repository.search("name", name);
        return data.thumbnail;
    }
}
exports.Media = Media;
//# sourceMappingURL=Media.js.map