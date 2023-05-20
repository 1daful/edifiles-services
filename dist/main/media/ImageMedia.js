"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMedia = void 0;
const ZernSerp_1 = require("../api/pic/ZernSerp");
const Media_1 = require("./Media");
class ImageMedia {
    constructor() {
        this.media = new Media_1.Media("images");
    }
    apis = [];
    media;
    zerpSerp;
    async readMedia(params, op) {
        if (params) {
            this.zerpSerp = new ZernSerp_1.ZerpSerp(params);
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
                this.zerpSerp = new ZernSerp_1.ZerpSerp(params);
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
exports.ImageMedia = ImageMedia;
//# sourceMappingURL=ImageMedia.js.map