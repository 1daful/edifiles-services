import { IMediaApi } from "./IMediaApi";
/**
 * This class takes all the individual media apis and use them for the application.
 */
export declare class MediaApi {
    api: IMediaApi;
    constructor(api: IMediaApi);
    /**
     * sethAuth sets the api key and id from the app config file
     */
    /**
     * pushObject takes two objects and put the first object into the second while removing any key that contains no value
     * @param bigObj the first object
     * @param smallObj the second object
     */
    private getResource;
    getItems(type: string): Promise<Record<string, any>[]>;
    postItem(type: string): Promise<Record<string, any>>;
}
