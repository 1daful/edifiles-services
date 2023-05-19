import { Repository } from '../model/Repository';
import { QuoteMedia } from './QuoteMedia';
import { NetworkLocal } from './../api/network';
import { MediaApi } from "../api/MediaApi.js";
import { IMedia } from "./IMedia.js";
//import { IRepository } from "../model/IRepository.js";
//import { SupabaseRepo } from "../model/SupabaseRepo";
import { EdiStorage } from "src/api/storage.js";
//import { Pexels } from "src/api/pic/Pexels.js";
//import { IMediaApi } from "src/api/IMediaApi.js";
import { ApiFormat } from "src/apiReqFormat/ApiFormat.js";
import { MediaRes, MediaType } from "src/Types.js";
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
    constructor(type: MediaRes) {
        this.repository = new Repository(type)
    }
    repository
    metadata = new Metadata()
    store = new EdiStorage()
    imageGen: Unsplash = new Unsplash({keyword: "christian and gospel", length: "10"})
    //search = new Typesense()
    //genre: string = '';
    client = new Axiosi()

    /**
     * Used to delegate a media class method to get mediaItems from its registered media APIs, and the save them in the repository for peristence.
     * @param type
     * @param media
     * @param params
     */
    async fetch(type?: MediaRes, params?: {}) {
        let media: IMedia
        //this.load(new QuoteMedia(params), "quotes")
        if(type) {
            switch (type) {
                case "quotes":
                    media = new QuoteMedia(params)
                    return await this.load(media, type)
                case "books":
                    media = new BookMedia(params)
                    return await this.load(media, type)
                case "videos":
                    media = new VideoMedia(params)
                    return await this.load(media, type)
                case "music":
                    media = new MusicMedia(params)
                    return await this.load(media, type)
            
                default:
                    break;
            }
        }
        else {
            await this.load(new QuoteMedia(params), "quotes")
            await this.load(new BookMedia(params), "books")
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

    async load(media: IMedia, type: MediaRes) {
        //const mediaItems: Record<string, any>[] = [];
        //const result: Record<string, any> = {}
       
        try {
            for (const api of media.apis) {
                let mediaApi: MediaApi = new MediaApi(api);
                //mediaItems.push(mediaApi.getItems(type, params));
                //const name = mediaApi.api.constructor.name
                //NetworkLocal.test(`${name} good!`)
                const items = await mediaApi.getItems(type) as unknown as MediaType[]
                //const images = await this.getImage(mediaApi, "christians")
                if (items && type=="quotes") {
                    //NetworkLocal.test(`This is item from Media load. ${items}`)
                    //this.repository.changeDB('supabase')
                    const images = await this.getImage()
                    if(Array.isArray(images)) {
                        for (let index = 0; index < 10; index++) {
                            const item = items[index];
                          item.thumbnailsmall = images[index]?.thumbnailSmall
                          item.thumbnaillarge = images[index]?.thumbnailLarge
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
                await this.metadata.saveGenres(items)
            }

        }
        catch (err) {
            console.log(err)
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

    private async addItems(items: Record<string, any>[], collName?: string): Promise<Record<string, any>> {
        const result = {}
        if(collName) {
            const repository = new Repository(collName)
            await repository.addItems(items);
            return result
        }
        try {
            //NetworkLocal.test("Adding items from Media")
            await this.repository.addItems(items);
        }
        catch (err) {
            console.log(err)
        }
        //console.log("Unable to load media")
        return result
    }

    async readItems(collName?: string, params?: Record<string, any>, op?: any, limit?: number) {
        let results: Record<string, any>[]
        if(collName) {
            const repository = new Repository(collName)
            results = await this.repository.readItems(collName, params, op, limit)
            NetworkLocal.test("result: ", results)
            return results
        }
        try {
            results = await this.repository.readItems(collName, params, op)
            /*for (const result of results) {
                const res = await this.repository.readItem(result._id)
                result.push(res)
            }*/
            NetworkLocal.test("result: ", results)
            return results
        }
        catch (err) {
            console.log(err)
            console.log("Unable to load media")
        }

    }

    async getImage() {
        const format = new ApiFormat({
            //item.description
          //keyword: query
        })
        //mediaApi = new MediaApi(new Pexels(new ApiFormat(format)))
          //const images = await mediaApi.getItems('images')
         // const pexels = new Pexels({})
          //const images = await pexels.getPhotos('e')
          
         const images = await this.client.get(this.imageGen.imageRes)
          return images
        //this.store.upload()
    }

    async getThumbnail(name: any, collName: string) {
        const repository = new Repository(collName)
        let data = await repository.search("name", name)
        return data.thumbnail
    }
    /*readItem(collName: string) {
        let item
        try {
            this.repository.readItem(collName).then(res => {
                item = res
            })
        }
        catch(err) {
            console.error(err)
        }

        return item
    }*/
}
