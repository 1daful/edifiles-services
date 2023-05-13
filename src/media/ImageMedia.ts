import { IMediaApi } from "../api/IMediaApi";
import { ZerpSerp } from "../api/pic/ZernSerp";
import { IMedia } from "./IMedia";
import { Media } from "./Media";

export class ImageMedia implements IMedia {
    constructor(){
        this.media = new Media("images");
    }
        apis: IMediaApi[] = [];
        media: Media;
        zerpSerp!: IMediaApi

        async readMedia(params?: any, op?: Record<string, any>) {
            if (params) {
                this.zerpSerp = new ZerpSerp(params)
                this.apis.push(this.zerpSerp);
                try {
                    return await this.media.readItems("images", params, op);
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

        async getMedia(params?: any) {
            //const res = {}
            if (!this.zerpSerp) {
                if (params)
                this.zerpSerp = new ZerpSerp(params)
                this.apis.push(this.zerpSerp);
            }
                try {
                    await this.media.load('images', this, params);
                }
                catch (err) {
                    console.log(err)
                }
            }
            //return res

}
