import { IMediaApi } from "../api/IMediaApi";
import { IMedia } from "./IMedia";
import { Media } from "./Media";
export declare class ImageMedia implements IMedia {
    constructor();
    apis: IMediaApi[];
    media: Media;
    zerpSerp: IMediaApi;
    readMedia(params?: any, op?: Record<string, any>): Promise<Record<string, any>[] | undefined>;
    getMedia(params?: any): Promise<void>;
}
