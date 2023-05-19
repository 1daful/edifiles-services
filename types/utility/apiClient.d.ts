export interface ApiClient {
    get(params: Record<string, any>): Promise<any[]>;
    post(/*data: Record<string,any>, */ params: Record<string, any>, auth?: any): Promise<any[]>;
}
