import { IMedia } from "./IMedia";
export declare class MediaProps {
    id: string;
    title: string;
    timestamp: number;
    status: string;
    privacy: string;
    tags: string[];
    url: string;
    description: string;
    genre: string;
    thumbnail: string;
    author: string;
    license: string;
    /**
     * mapProps takes two arguments:
     * response as in api response
     * media the media that possesses the properties
     * This function check if a property returned by api exists on the MediaProps object, and then use it to populate the media if it exists.
     * @param response
     * @param media
     */
    mapProps(response: Record<string, any>, media: IMedia): void;
}
