import { IRepository } from "./IRepository";
export declare class Metadata {
    repository: IRepository;
    saveGenres(items: Record<string, any>[]): Promise<void>;
    loadGenres(): Promise<Record<string, any>[]>;
}
