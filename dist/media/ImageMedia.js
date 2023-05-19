import { ZerpSerp } from "../api/pic/ZernSerp";
import { Media } from "./Media";
export class ImageMedia {
    constructor() {
        this.media = new Media("images");
    }
    apis = [];
    media;
    zerpSerp;
    async readMedia(params, op) {
        if (params) {
            this.zerpSerp = new ZerpSerp(params);
            this.apis.push(this.zerpSerp);
            try {
                return await this.media.readItems("images", params, op);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    async getMedia(params) {
        //const res = {}
        if (!this.zerpSerp) {
            if (params)
                this.zerpSerp = new ZerpSerp(params);
            this.apis.push(this.zerpSerp);
        }
        try {
            await this.media.load('images', this, params);
        }
        catch (err) {
            console.log(err);
        }
    }
}
