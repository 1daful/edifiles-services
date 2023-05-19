import { IMedia } from "./IMedia";
import { IMediaApi } from "../api/IMediaApi";
import { Youtube } from "../api/video/Youtube";
export class VideoMedia implements IMedia {
    apis: IMediaApi[] = [];
    private mediaItems: Record<string, any>[] = [];
    //media: Media;
    youtube: Youtube;

    constructor(format?: {}) {
        this.youtube = new Youtube(format);
        //this.media = new Media(type);
        this.apis.push(this.youtube)
    }

   /* async getMedia(params?: Record<string, any>) {
        //const res = {}
        try {
            await this.media.load('videos', this, params);
        }
        catch (err) {
            console.log(err)
        }
        //return res
    }
    async readMedia(params?: string[], op?: Record<string, any>) {
        try {
            return await this.media.readItems("videos", params, op);
        } 
        catch (err) {
            console.log(err)
        }
    }*/
}