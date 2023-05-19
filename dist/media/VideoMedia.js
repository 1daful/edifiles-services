import { Youtube } from "../api/video/Youtube";
export class VideoMedia {
    apis = [];
    mediaItems = [];
    //media: Media;
    youtube;
    constructor(format) {
        this.youtube = new Youtube(format);
        //this.media = new Media(type);
        this.apis.push(this.youtube);
    }
}
