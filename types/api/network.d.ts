export declare class NetworkLocal {
    static isLoopback: any;
    static onLine: boolean;
    static test(message: string, msg?: any, name?: string): {
        name: string;
        data: {
            id: number;
            status: string;
            privacy: string;
            tags: string[];
            description: string;
            genre: string;
            thumbnailSmall: string;
            thumbnailLarge: string;
            created: string;
            license: string;
            title: string;
            authors: {
                name: string;
                pic: string;
                bio: string;
            };
            printType: string;
        };
    } | undefined;
    private static dummyData;
}
