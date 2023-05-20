import { MediaRes } from '../../utility/Types';
import { DateTime } from 'gorsejs/src/interfaces';
import { Section } from '../../utility/Types';
import { Gorse } from "gorsejs/src";
export declare class Recommender {
    client: Gorse<string>;
    readMedia(section: Section, type: MediaRes, category: string, id?: string, op?: Record<string, any>): Promise<Record<string, any>[] | undefined>;
    indexItems(mediaList: Record<string, any>[], type: MediaRes): Promise<void>;
    private load;
    getMedia(type?: any, params?: {
        keyword: string;
    }): Promise<void>;
    getRecommended(userId: string, category?: string): Promise<string[]>;
    getPopular(category?: string): Promise<import("gorsejs/src").PopularOutput[]>;
    getLatest(category?: string): Promise<import("gorsejs/src").LatestOutput[]>;
    getRelated(itemId: string, category?: string): Promise<string[]>;
    insertFeedback(/*itemId: string, category: string, userId: string, score: number*/ userId: string, feedbackType: string, itemId: string, timestamp: DateTime): Promise<void>;
    insertUser(id: string): Promise<void>;
    insertItem(itemId: string, category: string): Promise<void>;
}
