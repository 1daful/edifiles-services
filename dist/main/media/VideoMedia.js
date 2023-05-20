"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoMedia = void 0;
const Youtube_1 = require("../api/video/Youtube");
class VideoMedia {
    apis = [];
    mediaItems = [];
    //media: Media;
    youtube;
    constructor(format) {
        this.youtube = new Youtube_1.Youtube(format);
        //this.media = new Media(type);
        this.apis.push(this.youtube);
    }
}
exports.VideoMedia = VideoMedia;
//# sourceMappingURL=VideoMedia.js.map