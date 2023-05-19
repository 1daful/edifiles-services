import { Request } from "./Request";
import { Response } from "./Response";
import { IMediaApi } from "./IMediaApi";
/**
 *
 * This class reads a media resource api configuration and sets up request format from it.
 * This class prepares the request parameters, and the appropriate response format.
 */
export declare class Resource {
    constructor(api: IMediaApi, type: string, request: Request, respName: string);
    type: string;
    request: Request;
    response: Response;
    api: IMediaApi;
    URL: string;
    /**
     * A private method to construct make resource filters part of the request
     * @param url
     * @param params
     */
    private isObject;
    getRequestParam(resData: Record<string, any>): Record<string, any>;
    /**
     * this method appends request parameters to api base parameters
     * @param type type of the resource to retrieve
     */
    getBaseParam(): Promise<{
        header: {};
        baseParams: {
            baseUrl: string;
        };
    }>;
    getBaseURL(): Promise<string | undefined>;
    getResponse(data: any): Record<string, any>[];
    getData(resData: Record<string, any>[]): Record<string, any>[];
}
