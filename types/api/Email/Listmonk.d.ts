import { ApiClient } from '../../utility/apiClient';
import { Resource } from '../Resource';
import { IMediaApi } from './../IMediaApi';
import { EmailAddress, EmailType } from "../../utility/Types";
export declare class ListMonk implements IMediaApi {
    client: ApiClient;
    resources: Resource[];
    transact: (format: EmailType) => Resource;
    transactionalResponse: {
        data: boolean;
    };
    campaign: (format: EmailType) => void;
    campaignPostResponse: {
        data: {
            id: number;
            created_at: string;
            updated_at: string;
            views: number;
            clicks: number;
            bounces: number;
            lists: {
                id: number;
                name: string;
            }[];
            started_at: null;
            to_send: number;
            sent: number;
            uuid: string;
            type: string;
            name: string;
            subject: string;
            from_email: string;
            body: string;
            altbody: null;
            send_at: null;
            status: string;
            content_type: string;
            tags: string[];
            template_id: number;
            messenger: string;
        };
    };
    subscriber: (format: Record<string, any>, data: EmailAddress) => void;
    getBaseUrl(): string;
    getBaseParams(): {
        baseParams: {
            apikey: string;
        };
    };
    getData(resData: Record<string, any>[]): Record<string, any>[];
}
