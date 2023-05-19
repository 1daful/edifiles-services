export declare class Request {
    constructor(name: string, url: string, params: Record<string, any>);
    name: string;
    baseUrl: string;
    params: Record<string, any>;
    data?: Record<string, any>;
}
