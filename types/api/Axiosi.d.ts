import { ApiClient } from "../apiClient";
import { Resource } from "./Resource";
import { AxiosBasicCredentials, AxiosRequestConfig } from 'axios';
export declare class Axiosi implements ApiClient {
    message: string;
    config: AxiosRequestConfig;
    get(resource: Resource, auth?: AxiosBasicCredentials): Promise<Record<string, any>[]>;
    post(resource: Resource, auth?: AxiosBasicCredentials): Promise<Record<string, any>[]>;
    load(addr: string, query?: any): Promise<import("axios").AxiosResponse<any, any> | undefined>;
    postTo(addr: string, data?: any, query?: any): Promise<import("axios").AxiosResponse<any, any> | undefined>;
}
