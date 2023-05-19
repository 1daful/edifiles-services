import { IMedia } from "./IMedia";
import { IMediaApi } from "../api/IMediaApi";
import { Youtube } from "../api/video/Youtube";
export declare class VideoMedia implements IMedia {
    apis: IMediaApi[];
    private mediaItems;
    youtube: Youtube;
    constructor(format?: {});
}
