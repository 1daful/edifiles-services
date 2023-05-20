import { ApiClient } from "../utility/apiClient";
//import { ApiFormat } from "../apiReqFormat/ApiFormat";
import { Resource } from "./Resource.js";

/**
 * The interface for all media classes
 */
export interface IMediaApi {
    client: ApiClient;
    resources: Resource[];

    //apiFormat: ApiFormat;
    //getResource(format: ApiFormat): Resource

    //setDataSource(data: Record<string, any>): void;

    getBaseUrl(): any
    getBaseParams(): any
    getData(res: Record<string, any>): Record<string, any>[];

    //setResponse(data: Record<string, any>): void;
}
