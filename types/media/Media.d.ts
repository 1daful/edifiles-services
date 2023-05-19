import { Repository } from '../model/Repository';
import { IMedia } from "./IMedia.js";
import { MediaRes } from "src/Types.js";
import { Axiosi } from "../api/Axiosi";
import { Unsplash } from "../api/pic/ImageGen";
import { Metadata } from '../model/metadata';
/**
 * Class Media acts as delegates for the media class instances' functions.
 * @function load
 * @function createApi
 */
export declare class Media {
    constructor(type: MediaRes);
    repository: Repository;
    metadata: Metadata;
    store: any;
    imageGen: Unsplash;
    client: Axiosi;
    /**
     * Used to delegate a media class method to get mediaItems from its registered media APIs, and the save them in the repository for peristence.
     * @param type
     * @param media
     * @param params
     */
    fetch(type?: MediaRes, params?: {}): Promise<void>;
    load(media: IMedia, type: MediaRes): Promise<void>;
    /**
     * Delegate method for a media class to register it's API objects
     * @param media
     * @param api
     */
    private addItems;
    readItems(collName?: string, params?: Record<string, any>, op?: any, limit?: number): Promise<Record<string, any>[] | undefined>;
    getImage(): Promise<Record<string, any>[]>;
    getThumbnail(name: any, collName: string): Promise<any>;
}
