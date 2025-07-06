export type ApiRequest = {
    url: string;
    config?: Record<string , any>;
    data?: Record<string , any>;
    cacheKey?: string
}