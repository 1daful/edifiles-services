import { emailReq } from '../../utility/Types';
import { IMediaApi } from '../IMediaApi';
import { Resource } from './../Resource';
import { Axiosi } from './../Axiosi';
import { EmailAddress, EmailType } from "../../utility/Types";
export declare class Zeptomail implements IMediaApi {
    resources: Resource[];
    getBaseUrl(): string | undefined;
    getBaseParams(): {
        header: {
            Authorization: string;
        };
        baseParams: {};
    };
    getData(res: Record<string, any>[]): Record<string, any>[];
    admin: {
        address: string;
        name: string;
    }[];
    getResource(req: emailReq, user: EmailAddress[], email: EmailType): Resource;
    client: Axiosi;
}
