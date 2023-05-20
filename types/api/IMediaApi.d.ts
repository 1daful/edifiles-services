import { ApiClient } from "../utility/apiClient";
import { Resource } from "./Resource.js";
/**
 * The interface for all media classes
 */
export interface IMediaApi {
    client: ApiClient;
    resources: Resource[];
    getBaseUrl(): any;
    getBaseParams(): any;
    getData(res: Record<string, any>): Record<string, any>[];
}
