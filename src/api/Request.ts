export class Request {
    constructor(name: string, url: string , params: Record<string, any>){
        this.name = name;
        this.baseUrl = url;
        this.params = params;
    }
    name: string;
    baseUrl: string;
    params: Record<string , any>;
    data?: Record<string , any>;
}