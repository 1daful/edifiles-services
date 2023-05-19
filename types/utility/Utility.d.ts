export declare class Utility {
    handler: {
        get: (obj: Record<string, any>, prop: string) => any;
    };
    getDefaultProxy(target: Record<string, any>): Record<string, any>;
    getDefault(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any>;
    /**
    * pushObject takes two objects and put the first object into the second while removing any key that contains no value
    * @param bigObj the first object
    * @param smallObj the second object
    */
    joinObject(bigObj: Record<string, any>, smallObj: Record<string, any>): Record<string, any>;
    getUrl(url: string): Record<string, any>;
}
